# Simple Math
A simple math quiz game for kids.

Inspired by [随练数学](https://ss.easya.work/)

## Installation

### Local Development

1. Clone the repository:
```bash
git clone https://github.com/veapon/simple-math.git
cd simple-math
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Docker Deployment

#### Using Docker Compose (Recommended)

1. Clone the repository:
```bash
git clone https://github.com/veapon/simple-math.git
cd simple-math
```

2. Run with Docker Compose:
```bash
docker-compose up -d
```

3. Access the app at `http://localhost:3000`

#### Using Docker directly

1. Build the Docker image:
```bash
docker build -t simple-math .
```

2. Run the container:
```bash
docker run -d -p 3000:80 --name simple-math simple-math
```

3. Access the app at `http://localhost:3000`