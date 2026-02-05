-- Seed Data for 18 Siddhars
-- Run this in your Supabase SQL Editor to populate the table.

INSERT INTO public.siddhars (name, title, bio, image_path, expertise, sort_order) VALUES
(
  'Agastya',
  'The Father of Tamil Siddha Medicine',
  'Agastya is considered the foremost of the Siddhars and the guru of many others. He is credited with the creation of the first Tamil grammar (Agathiyam) and extensive texts on medicine, alchemy, and yoga. Legend says he lowered the Vindhya mountains and drank the ocean to restore balance to the world. He is the master of the Kumbhak-based Pranayama.',
  '/images/siddhars/agastya.png',
  ARRAY['Medicine', 'Tamil Grammar', 'Yoga', 'Alchemy'],
  1
),
(
  'Bhogar',
  'The Master Alchemist',
  'Bhogar (Bhoganathar) is a legendary alchemist who is said to have lived for thousands of years. He traveled to China and taught alchemy there (where he is possibly known as Lao Tzu). He created the Navapashanam idol of Lord Murugan at Palani, a masterpiece of solidified medicinal poison that cures diseases. He authored the Bhogar 7000.',
  '/images/siddhars/bhogar.png',
  ARRAY['Alchemy', 'Medicine', 'Yantra', 'Philosophy'],
  2
),
(
  'Thirumoolar',
  'The Prince of Yogis',
  'Thirumoolar is the author of the Thirumandiram, a seminal text of 3,000 verses that lays the foundation of Saiva Siddhanta philosophy and Yoga. He emphasized that "Love is God" (Anbe Sivam) and perfected the science of Kaya Kalpa (body rejuvenation). He is said to have meditated for one year to write each verse.',
  '/images/siddhars/thirumoolar.png',
  ARRAY['Yoga', 'Philosophy', 'Kaya Kalpa', 'Tantra'],
  3
),
(
  'Korakkar',
  'The Sage of Cannabis',
  'Korakkar was a disciple of Bhogar and heavily associated with the use of herbs, particularly cannabis (Ganja), for medicinal and spiritual purposes. He established a seamless method of predicting future events and wrote extensively on the philosophy of Avadhutas.',
  '/images/siddhars/agastya.png', -- Placeholder
  ARRAY['Herbalism', 'Prophecy', 'Philosophy'],
  4
),
(
  'Pulipani',
  ' The Tiger-Rider',
  'Pulipani was Bhogar''s premier disciple. He assisted Bhogar in the creation of the Navapashana idol. He is often depicted riding a tiger, symbolizing his mastery over the animal instincts. He settled in Palani to maintain the traditions established by his master.',
  '/images/siddhars/bhogar.png', -- Placeholder
  ARRAY['Alchemy', 'Ritual', 'Herbalism'],
  5
),
(
  'Kongananar',
  'The Master of Gold',
  'Kongananar was a master of turning base metals into gold, not for wealth, but as a demonstration of mastery over matter. He wrote extensively on the philosophy of the self and the nature of the ultimate reality (Brahman).',
  '/images/siddhars/thirumoolar.png', -- Placeholder
  ARRAY['Alchemy', 'Philosophy', 'Yoga'],
  6
),
(
  'Ramadevar',
  'The Jacob of Siddhas',
  'Ramadevar, also known as Yakub in Sufi traditions, is a unique Siddhar who bridged Hindu and Islamic mysticism. He traveled to Mecca and taught the unity of all spiritual paths. He is a master of simplified alchemical processes.',
  '/images/siddhars/agastya.png', -- Placeholder
  ARRAY['Alchemy', 'Mysticism', 'Medicine'],
  7
),
(
  'Sundaranandar',
  'The Beautiful Sage',
  'He is known for his poetic contributions to the Siddha literature. He emphasized the beauty of the creation as a reflection of the creator. He focused significantly on pediatric medicine and vaccines.',
  '/images/siddhars/thirumoolar.png', -- Placeholder
  ARRAY['Medicine', 'Pediatrics', 'Poetry'],
  8
),
(
  'Kudambai',
  'The Ear-Ring Sage',
  'Kudambai Siddhar''s poems are addressed to "Kudambai" (a woman wearing ear-rings), symbolizing the soul. He taught that external rituals are unnecessary once inner realization is achieved. His philosophy is radical and direct.',
  '/images/siddhars/agastya.png', -- Placeholder
  ARRAY['Philosophy', 'Yoga', 'Poetry'],
  9
),
(
  'Karuvoorar',
  'The Temple builder',
  'Karuvoorar is the Siddhar behind the consecration of the Brihadeeswarar Temple in Thanjavur. He was a master of Vastu Shastra and temple architecture, infusing structures with immense spiritual power.',
  '/images/siddhars/bhogar.png', -- Placeholder
  ARRAY['Architecture', 'Vastu', 'Tantra'],
  10
),
(
  'Idaikkadar',
  'The Shepherd Sage',
  'A shepherd by profession, he attained realization while tending to his flock. He is famous for his astrological predictions and his dialogue with the planets to avert a famine. He represents the wisdom found in simplicity.',
  '/images/siddhars/thirumoolar.png', -- Placeholder
  ARRAY['Astrology', 'Astronomy', 'Philosophy'],
  11
),
(
  'Chattaimuni',
  'The Woolen-Clad Sage',
  'He wore a coat of wool (Chattai) and is known for condensing the vast knowledge of the Siddhars into simpler texts. He is a key figure in the transmission of alchemical knowledge involving mercury and arsenic.',
  '/images/siddhars/bhogar.png', -- Placeholder
  ARRAY['Alchemy', 'Medicine', 'Literature'],
  12
),
(
  'Machamuni',
  'The Fish Sage',
  'Often identified with Matsyendranath of the Nath tradition, linking the Tamil Siddhas with the Northern Nath Yogis. He is a master of Hatha Yoga and the awakening of the Kundalini energy.',
  '/images/siddhars/thirumoolar.png', -- Placeholder
  ARRAY['Hatha Yoga', 'Kundalini', 'Tantra'],
  13
),
(
  'Kamalamuni',
  'The Lotus Sage',
  'Kamalamuni is known for his work in medicine and his specialized knowledge of kalpa (rejuvenation) therapies involving specific herbal preparations.',
  '/images/siddhars/agastya.png', -- Placeholder
  ARRAY['Medicine', 'Herbalism', 'Yoga'],
  14
),
(
  'Valmiki',
  'The Poet Sage',
  'While famous for the Ramayana, in the Siddha tradition, Valmiki is revered as a master of "Vananthara" (forest medicine) and subtle vitality. He is said to have learned from Narada.',
  '/images/siddhars/thirumoolar.png', -- Placeholder
  ARRAY['Poetry', 'Forest Medicine', 'Yoga'],
  15
),
(
  'Pambatti',
  'The Snake Charmer',
  'Pambatti used the metaphor of a snake to explain the Kundalini energy. His poems typically end with "Aadu Pambe" (Dance, O Snake!). He taught that the true snake to be charmed is the mind.',
  '/images/siddhars/bhogar.png', -- Placeholder
  ARRAY['Kundalini Yoga', 'Philosophy', 'Poetry'],
  16
),
(
  'Dhanvantri',
  'The Divine Healer',
  'Though considered an Avatar of Vishnu in broader Hinduism, in the Siddha lineage, he is a realized sage who perfected the diagnostic methods suitable for the Kali Yuga (current age).',
  '/images/siddhars/agastya.png', -- Placeholder
  ARRAY['Diagnosis', 'Surgery', 'Medicine'],
  17
),
(
  'Patanjali',
  'The Father of Yoga',
  'The compiler of the Yoga Sutras. In the Tamil tradition, he is a Siddhar who also mastered dance (being an incarnation of Adisesha) and meditated at the Chidambaram temple.',
  '/images/siddhars/thirumoolar.png', -- Placeholder
  ARRAY['Yoga Sutras', 'Dance', 'Philosophy'],
  18
);
