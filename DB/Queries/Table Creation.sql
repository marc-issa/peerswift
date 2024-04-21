-- Creating enumerated types
CREATE TYPE transaction_status AS ENUM ('Completed','Pending', 'Cancelled');
CREATE TYPE source_type AS ENUM ('CreditCard');
CREATE TYPE matching_status AS ENUM ('Matching','Matched', 'Cancelled');
CREATE TYPE hold_status AS ENUM ('Active', 'Released', 'Cancelled');

-- Create the "countries" table first as it is referenced by other tables
CREATE TABLE countries (
    id SERIAL PRIMARY KEY,
    code VARCHAR(4),
    name VARCHAR(255),
    abbreviation VARCHAR(4),
    currency_name VARCHAR(255),
    currency_code VARCHAR(3),
    flag VARCHAR(255)
);

-- Create the "users" table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    phone_number VARCHAR(15) UNIQUE,
    full_name VARCHAR(255),
    mid VARCHAR(255),
    dob DATE,
    country int REFERENCES countries(id),
    kyc_status BOOLEAN,
    pin VARCHAR(255),
    registration_date TIMESTAMP
);

-- Create the "credit_cards" table
CREATE TABLE credit_cards (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    card_number VARCHAR(19),
    expiry_date DATE,
    cvv VARCHAR(4),
    card_holder_name VARCHAR(255),
    billing_address VARCHAR(255)
);

-- Create the "transactions" table
CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,
    initiator_user_id INT REFERENCES users(id),
    partner_user_id INT REFERENCES users(id),
    amount DECIMAL(10, 2),
    currency VARCHAR(3),
    status transaction_status,
    creation_date TIMESTAMP,
    completion_date TIMESTAMP,
    fee DECIMAL(10, 2)
);

-- Create the "top_ups" table
CREATE TABLE top_ups (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    amount DECIMAL(10, 2),
    currency VARCHAR(3),
    time TIMESTAMP,
    source source_type
);

-- Create the "transactions_history" table
CREATE TABLE transactions_history (
    id SERIAL PRIMARY KEY,
    transaction_id INT REFERENCES transactions(id),
    top_up_id INT REFERENCES top_ups(id),
    user_id INT REFERENCES users(id)
);

-- Create the "matched_requests" table
CREATE TABLE matched_requests (
    id SERIAL PRIMARY KEY,
    user1_id INT REFERENCES users(id),
    user2_id INT REFERENCES users(id),
    amount INT,
    currency VARCHAR(4),
    user1_transfer_confirmed BOOLEAN,
    user2_transfer_confirmed BOOLEAN,
    user1_received_confirmed BOOLEAN,
    user2_received_confirmed BOOLEAN,
    status transaction_status,
    creation_date TIMESTAMP,
    completion_date TIMESTAMP
);

-- Create the "unmatched_requests" table
CREATE TABLE unmatched_requests (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    amount INT,
    currency VARCHAR(4),
    destination_country_id INT REFERENCES countries(id),
    status matching_status,
    creation_date TIMESTAMP
);

-- Create the "requests_history" table
CREATE TABLE requests_history (
    id SERIAL PRIMARY KEY,
    unmatched_id INT REFERENCES unmatched_requests(id),
    matched_id INT REFERENCES matched_requests(id),
    user_id INT REFERENCES users(id),
    date TIMESTAMP
);

-- Create the "notifications" table
CREATE TABLE notifications (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    message TEXT,
    timestamp TIMESTAMP,
    is_read BOOLEAN
);

-- Create the "wallets" table
CREATE TABLE wallets (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    balance DECIMAL(10, 2),
    currency VARCHAR(3)
);

-- Create the "groups" table
CREATE TABLE groups (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    country_id int REFERENCES countries(id)
);

-- Create the "user_group_memberships" table
CREATE TABLE user_group_memberships (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    group_id INT REFERENCES groups(id),
    join_date TIMESTAMP
);

-- Create the "group_messages" table
CREATE TABLE group_messages (
    id SERIAL PRIMARY KEY,
    group_id INT REFERENCES groups(id),
    user_id INT REFERENCES users(id), -- Sender
    message VARCHAR(255),
    timestamp TIMESTAMP
);

-- Create the "user_contacts" table
CREATE TABLE user_contacts (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    contact_user_id INT REFERENCES users(id),
    added_date TIMESTAMP
);

-- Create the "credit_card_holds" table
CREATE TABLE credit_card_holds (
    id SERIAL PRIMARY KEY,
    card_id INT REFERENCES credit_cards(id),
    user_id INT REFERENCES users(id),
    amount DECIMAL(10, 2),
    currency VARCHAR(3),
    hold_placed_time TIMESTAMP,
    hold_released_time TIMESTAMP,
    status hold_status
);

-- Create the "user_ratings" table
CREATE TABLE user_ratings (
    id SERIAL PRIMARY KEY,
    rated_user_id INT REFERENCES users(id),
    rating_user_id INT REFERENCES users(id),
    rating DECIMAL(2, 1),
    comment TEXT,
    rating_date TIMESTAMP
);
