-- Schema for the WEBSITE_QUATTRO_V2 application database (MySQL / Hostinger).
-- Run this once against a fresh database, locally and on Hostinger.

CREATE TABLE IF NOT EXISTS leads (
  id CHAR(36) PRIMARY KEY,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  company VARCHAR(255),
  service VARCHAR(255),
  message TEXT NOT NULL,
  source VARCHAR(100),
  status VARCHAR(50) NOT NULL DEFAULT 'new'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS blog_posts (
  id CHAR(36) PRIMARY KEY,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  excerpt TEXT NOT NULL,
  content LONGTEXT NOT NULL,
  cover_image VARCHAR(500),
  category VARCHAR(100),
  tags JSON,
  author VARCHAR(255) NOT NULL,
  published BOOLEAN NOT NULL DEFAULT FALSE,
  published_at TIMESTAMP NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE INDEX idx_blog_posts_published ON blog_posts (published, published_at);
CREATE INDEX idx_blog_posts_category ON blog_posts (category);

CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id CHAR(36) PRIMARY KEY,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  email VARCHAR(255) NOT NULL UNIQUE,
  name VARCHAR(255),
  status VARCHAR(50) NOT NULL DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
