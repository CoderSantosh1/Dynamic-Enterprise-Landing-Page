import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const defaultContent = {
  _id: 'landing-page',
  heroTitle: 'Build smarter systems for modern growth.',
  subtitle:
    'We help enterprise teams align strategy, operations, and digital transformation to unlock measurable performance.',
  ctaText: 'Book a strategy call',
  stats: [
    { label: 'Global clients', value: '120+' },
    { label: 'Average ROI uplift', value: '32%' },
    { label: 'Transformation programs', value: '260' },
    { label: 'Market response', value: '4.9/5' }
  ]
};

let inMemoryContent = { ...defaultContent };

const landingPageContentSchema = new mongoose.Schema(
  {
    _id: String,
    heroTitle: String,
    subtitle: String,
    ctaText: String,
    stats: [
      {
        label: String,
        value: String
      }
    ]
  },
  { collection: 'landingPageContent', timestamps: true }
);

const LandingPageContent = mongoose.model('LandingPageContent', landingPageContentSchema);

const normalizePayload = (payload = {}) => ({
  _id: 'landing-page',
  heroTitle: payload.heroTitle || defaultContent.heroTitle,
  subtitle: payload.subtitle || defaultContent.subtitle,
  ctaText: payload.ctaText || defaultContent.ctaText,
  stats:
    Array.isArray(payload.stats) && payload.stats.length > 0
      ? payload.stats.map((stat) => ({
          label: stat.label || 'Metric',
          value: stat.value || '0'
        }))
      : defaultContent.stats,
  updatedAt: new Date().toISOString()
});

const ensureSeedDocument = async () => {
  const existing = await LandingPageContent.findById('landing-page').lean();

  if (!existing) {
    await LandingPageContent.create({
      _id: 'landing-page',
      ...normalizePayload(defaultContent)
    });
  }
};

const loadContent = async () => {
  const document = await LandingPageContent.findById('landing-page').lean();

  if (document) {
    inMemoryContent = document;
    return document;
  }

  inMemoryContent = { ...defaultContent };
  return inMemoryContent;
};

async function connectDatabase() {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/eminenture';

  try {
    await mongoose.connect(uri, { dbName: 'eminenture' });
    console.log('MongoDB connected');
    await ensureSeedDocument();
    await loadContent();
  } catch (error) {
    console.warn('MongoDB unavailable, using in-memory fallback data.', error.message);
  }
}

connectDatabase();

app.get('/', (_req, res) => {
  res.json({ message: 'Eminenture backend is running.' });
});

app.get('/api/content', async (_req, res) => {
  if (mongoose.connection.readyState === 1) {
    const document = await LandingPageContent.findById('landing-page').lean();

    if (document) {
      inMemoryContent = document;
      return res.json(document);
    }
  }

  return res.json(inMemoryContent);
});

app.put('/api/content', async (req, res) => {
  const nextContent = normalizePayload(req.body);

  if (mongoose.connection.readyState === 1) {
    const updated = await LandingPageContent.findByIdAndUpdate(
      'landing-page',
      { ...nextContent },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    inMemoryContent = updated?.toObject ? updated.toObject() : updated;
    return res.json(inMemoryContent);
  }

  inMemoryContent = nextContent;
  return res.json(inMemoryContent);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend listening on http://localhost:${PORT}`);
});
