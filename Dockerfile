FROM mcr.microsoft.com/playwright:v1.49.1-noble

# Set working directory
WORKDIR /e2e

# Copy package.json and package-lock.json first to leverage Docker cache
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the project files
COPY . .

# Ensure proper file permissions
RUN chmod -R 777 /e2e

# Install Playwright browsers
RUN npx playwright install --with-deps

# Run Playwright tests
CMD ["npx", "playwright", "test", "--reporter=list"]