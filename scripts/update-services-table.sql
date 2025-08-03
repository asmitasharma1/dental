-- Add new columns to services table for Q&A and image
ALTER TABLE services 
ADD COLUMN image_url VARCHAR(500) AFTER duration,
ADD COLUMN why_use_service TEXT AFTER image_url,
ADD COLUMN what_if_not_used TEXT AFTER why_use_service,
ADD COLUMN before_appointment TEXT AFTER what_if_not_used,
ADD COLUMN after_service TEXT AFTER before_appointment;

-- Update existing services with sample data (you can modify these)
UPDATE services SET 
  why_use_service = 'Regular scaling and cleaning prevents gum disease, removes plaque buildup, and maintains optimal oral health.',
  what_if_not_used = 'Without regular cleaning, plaque hardens into tartar, leading to gum disease, tooth decay, and potential tooth loss.',
  before_appointment = 'Brush and floss normally. Avoid eating 2 hours before the appointment. Inform us of any medications you are taking.',
  after_service = 'Avoid hot/cold foods for 24 hours. Use prescribed mouthwash. Schedule your next cleaning in 6 months.'
WHERE id=1;

UPDATE services SET 
  why_use_service = 'Dental fillings restore damaged teeth, prevent further decay, and maintain tooth structure and function.',
  what_if_not_used = 'Untreated cavities will grow larger, potentially requiring root canal treatment or tooth extraction.',
  before_appointment = 'Eat a light meal beforehand. Take prescribed antibiotics if recommended. Arrange transportation if sedation is used.',
  after_service = 'Avoid hard foods for 24 hours. The filling may feel sensitive initially. Contact us if pain persists beyond 48 hours.'
WHERE id=2;

UPDATE services SET 
  why_use_service = 'Root canal treatment saves infected teeth, eliminates pain, and prevents the need for tooth extraction.',
  what_if_not_used = 'Infected teeth can lead to abscesses, severe pain, swelling, and potential loss of the tooth.',
  before_appointment = 'Take prescribed antibiotics. Eat a good meal before treatment. Arrange for someone to drive you home.',
  after_service = 'Take prescribed pain medication. Avoid chewing on treated side for 24 hours. Schedule follow-up for crown placement.'
WHERE id=8;
