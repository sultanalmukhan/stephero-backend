CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE user_progress (
  user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  total_steps BIGINT DEFAULT 0,
  total_xp BIGINT DEFAULT 0,
  current_level INT DEFAULT 1,
  last_sync_date TIMESTAMP,
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE sync_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  steps_added INT NOT NULL,
  sync_from_date TIMESTAMP NOT NULL,
  sync_to_date TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_sync_history_user_date ON sync_history(user_id, sync_to_date DESC);
CREATE INDEX idx_user_progress_user ON user_progress(user_id);
