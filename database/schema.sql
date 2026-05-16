-- Areas (Kernthemen)
CREATE TABLE IF NOT EXISTS areas (
    id          VARCHAR(10) PRIMARY KEY,
    name        VARCHAR(255) NOT NULL,
    short       VARCHAR(100) NOT NULL,
    color       VARCHAR(7)   NOT NULL,
    icon        VARCHAR(10)  NOT NULL,
    blurb       TEXT
);

-- Goals (Mehrjahresziele)
CREATE TABLE IF NOT EXISTS goals (
    id          VARCHAR(20) PRIMARY KEY,
    area_id     VARCHAR(10) REFERENCES areas(id),
    name        TEXT        NOT NULL,
    type        VARCHAR(50)
);

-- Annual Goals (Jahresziele)
CREATE TABLE IF NOT EXISTS annual_goals (
    id          VARCHAR(20) PRIMARY KEY,
    goal_id     VARCHAR(20) REFERENCES goals(id),
    year        INTEGER     NOT NULL,
    name        TEXT        NOT NULL,
    kpis        TEXT[]
);

-- Projects
CREATE TABLE IF NOT EXISTS projects (
    id              VARCHAR(10) PRIMARY KEY,
    name            TEXT        NOT NULL,
    description     TEXT,
    status          VARCHAR(20) NOT NULL,
    budget          INTEGER     NOT NULL,
    resources       VARCHAR(255),
    duration        VARCHAR(20),
    priority        VARCHAR(10),
    area_id         VARCHAR(10) REFERENCES areas(id),
    goal_id         VARCHAR(20),
    annual_goal_id  VARCHAR(20),
    year            INTEGER,
    dependencies    TEXT[],
    reg             TEXT,
    reg_paragraph   VARCHAR(10),
    overlap         TEXT[]
);

-- Orientations
CREATE TABLE IF NOT EXISTS orientations (
    id              VARCHAR(20) PRIMARY KEY,
    name            VARCHAR(100) NOT NULL,
    icon            VARCHAR(10),
    tag             TEXT,
    description     TEXT,
    weight_ki       INTEGER,
    weight_pl       INTEGER,
    weight_ak       INTEGER,
    weight_ve       INTEGER,
    risk            VARCHAR(20),
    tt_impact       VARCHAR(20),
    active_projects TEXT[],
    priority_mz     TEXT[]
);

-- KI-generierte Ausrichtungen
CREATE TABLE IF NOT EXISTS ai_orientations (
    id              SERIAL PRIMARY KEY,
    name            VARCHAR(100) NOT NULL,
    icon            VARCHAR(10),
    tag             TEXT,
    description     TEXT,
    explanation     TEXT,
    user_input      TEXT,
    weight_ki       INTEGER,
    weight_pl       INTEGER,
    weight_ak       INTEGER,
    weight_ve       INTEGER,
    risk            VARCHAR(20),
    tt_impact       VARCHAR(20),
    active_projects TEXT[],
    priority_mz     TEXT[],
    created_at      TIMESTAMP DEFAULT NOW()
);

-- Chat Sessions
CREATE TABLE IF NOT EXISTS chat_sessions (
    id               SERIAL PRIMARY KEY,
    title            VARCHAR(255),
    orientation_name VARCHAR(100),
    created_at       TIMESTAMP DEFAULT NOW(),
    updated_at       TIMESTAMP DEFAULT NOW()
);

-- Chat Messages
CREATE TABLE IF NOT EXISTS chat_messages (
    id         SERIAL PRIMARY KEY,
    session_id INTEGER REFERENCES chat_sessions(id) ON DELETE CASCADE,
    role       VARCHAR(20) NOT NULL,
    content    TEXT        NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);
