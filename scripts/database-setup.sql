-- Create database
CREATE DATABASE IF NOT EXISTS dental_clinic;
USE dental_clinic;

-- Services table
CREATE TABLE services (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category ENUM('general', 'cosmetic', 'restorative', 'pediatric') NOT NULL,
    price DECIMAL(10,2),
    duration INT, -- in minutes
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Doctors table
CREATE TABLE doctors (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    position VARCHAR(255),
    degree VARCHAR(255),
    nmc_number VARCHAR(50),
    specialties JSON,
    image_url VARCHAR(500),
    linkedin_url VARCHAR(500),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Appointments table
CREATE TABLE appointments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    preferred_date DATE,
    preferred_time TIME,
    service_id INT,
    message TEXT,
    status ENUM('pending', 'confirmed', 'completed', 'cancelled') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (service_id) REFERENCES services(id)
);

-- Testimonials table
CREATE TABLE testimonials (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    service VARCHAR(255),
    quote TEXT NOT NULL,
    rating INT DEFAULT 5,
    is_featured BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Admin users table
CREATE TABLE admin_users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('admin', 'staff') DEFAULT 'staff',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert sample data
INSERT INTO services (title, description, category, price, duration) VALUES
('Professional Teeth Cleaning & Scaling', 'Deep cleaning to remove plaque and tartar buildup for optimal oral health', 'general', 2500.00, 60),
('Dental Fillings & Cavity Treatment', 'High-quality composite fillings to restore damaged teeth', 'general', 1500.00, 45),
('Professional Teeth Whitening', 'Advanced whitening treatments for a brighter, confident smile', 'cosmetic', 8000.00, 90),
('Porcelain Veneers', 'Premium porcelain veneers for a perfect smile', 'cosmetic', 25000.00, 120),
('Dental Crowns', 'High-quality crowns to restore damaged teeth', 'restorative', 15000.00, 90),
('Dental Implants', 'Permanent tooth replacement solution', 'restorative', 45000.00, 180),
('Children\'s Dental Cleaning', 'Gentle dental care for children', 'pediatric', 2000.00, 45),
('Root Canal Treatment', 'Advanced endodontic treatment', 'general', 12000.00, 120);

INSERT INTO doctors (name, position, degree, nmc_number, specialties, image_url) VALUES
('Dr. Kareen Rana', 'Aesthetic and Restorative Dentist', 'BDS (TU), Master in Aesthetic and Restorative Dentistry (UK)', '23759', '["Cosmetic Dentistry", "Restorative Dentistry", "Smile Makeover"]', '/images/kareen.avif'),
('Dr. Kishor Dutta', 'Orthodontist', 'BDS (BPKIHS), MDS (IOM)', '12045', '["Braces", "Aligners", "Jaw Correction"]', '/images/kishor.avif'),
('Dr. Bipulesh Goit', 'Oral and Maxillofacial Surgeon', 'BDS (BPKIHS), MDS (TU)', '14763', '["Oral Surgery", "Facial Trauma", "Implants"]', '/images/bipulesh.avif'),
('Dr. Nimisha Adhikari', 'Endodontist', 'BDS (BPKIHS), MDS (TU)', '17478', '["Root Canal Treatment", "Restorative Dentistry", "Pain Management"]', '/images/nimisha.avif'),
('Dr. Gautami Maharjan', 'General Dentist', 'BDS (RMU)', '37181', '["General Dentistry", "Oral Hygiene", "Preventive Care"]', '/images/gautami.avif');

INSERT INTO testimonials (name, service, quote, rating, is_featured) VALUES
('Sarah Johnson', 'Dental Implants', 'Dr. Kareen and her team provided exceptional care during my dental implant procedure. The results exceeded my expectations!', 5, TRUE),
('Michael Chen', 'Pediatric Dentistry', 'My children love coming here! The pediatric dentistry team makes every visit comfortable and fun for kids.', 5, TRUE),
('Emma Rodriguez', 'Restorative Dentistry', 'The restorative work done on my teeth was amazing. I can smile confidently again thanks to Dr. Kareen\'s expertise.', 5, TRUE);

-- Create admin user (password: admin123)
-- You'll need to update this hash or create the user through the API
INSERT INTO admin_users (username, email, password_hash, role) VALUES
('admin', 'admin@smilebydrkareen.com', '$2b$10$K7L/R3.HWYTB/xJxN5.B2OKMTQ5pIpIL22jHkfDyUiflHWQhgdXSa', 'admin');


-- CREATE USER 'dentalclinic'@'localhost' IDENTIFIED BY 'gorkhali';
-- GRANT ALL PRIVILEGES ON dental_clinic.* TO 'dentalclinic'@'localhost';
-- FLUSH PRIVILEGES;




-- Create blogs table for the dental clinic
CREATE TABLE IF NOT EXISTS blogs (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT NOT NULL,
    author VARCHAR(100) NOT NULL,
    image_url VARCHAR(500),
    published_date DATE NOT NULL,
    is_published BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample blog posts
INSERT INTO blogs (title, content, excerpt, author, image_url, published_date, is_published) VALUES
(
    'The Importance of Regular Dental Checkups',
    'Regular dental checkups are essential for maintaining good oral health. During these visits, your dentist can detect problems early, before they become serious and expensive to treat.

During a typical checkup, your dentist will:
- Examine your teeth and gums for signs of decay or disease
- Clean your teeth to remove plaque and tartar buildup
- Check for oral cancer
- Assess your bite and jaw alignment
- Discuss your oral hygiene routine

Most dental professionals recommend visiting every six months, though some patients may need more frequent visits based on their individual risk factors.',
    'Learn why regular dental checkups are crucial for your oral health and what to expect during your visit.',
    'Dr. Kareen',
    '/placeholder.svg?height=300&width=400',
    '2024-01-15',
    true
),
(
    'How to Maintain Healthy Teeth at Home',
    'Maintaining healthy teeth at home is just as important as regular dental visits. Here are the essential steps for proper oral hygiene:

**Brushing Technique:**
- Brush twice daily with fluoride toothpaste
- Use a soft-bristled toothbrush
- Brush for at least 2 minutes
- Replace your toothbrush every 3-4 months

**Flossing:**
- Floss daily to remove plaque between teeth
- Use proper technique to avoid damaging gums

**Diet and Lifestyle:**
- Limit sugary and acidic foods
- Drink plenty of water
- Avoid tobacco products
- Consider using mouthwash for additional protection',
    'Discover the best practices for maintaining excellent oral hygiene at home between dental visits.',
    'Dr. Kareen',
    '/placeholder.svg?height=300&width=400',
    '2024-01-10',
    true
);
