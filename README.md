# CapDash - Legislative Interaction and Relationship Dashboard

https://github.com/user-attachments/assets/a19bc2d7-a9e1-4967-bf0f-5b12e40eb59f

[Link to Demo Video](https://vimeo.com/1000541895)

CapDash (Capitol Dashboard) is a full-stack web application designed to streamline the tracking of interactions and relationships within the legislative community. It aims to empower non-profit organizations by offering a cost-effective alternative to the high-end platforms typically used by lobbyists.

Many non-profits engage with a wide range of legislators, officials, and stakeholders, making it essential to keep accurate records of interactions, meetings, and key relationships. CapDash ensures that teams avoid duplication of effort and maintain clear communication strategies, improving their advocacy efforts.

I embarked on this project with the intent to provide a practical, free solution to non-profits that cannot afford the expensive tools currently available in the market. Although the project remains unfinished, it represents a significant learning experience for me, and I plan to revisit it to bring my original vision to life.

## Key Takeaways and Growth

Working on CapDash has been a foundational experience in my development as a software engineer, particularly in full-stack web development. This project allowed me to:
- **Set up a local development environment** using containerized services and custom scripts for easier replication and scaling.
- **Connect to external services** like Supabase, to manage a hosted PostgreSQL database efficiently.
- **Host services like Typesense**, enabling rapid search capabilities.
- **Design and implement a user-friendly UI**, based on feedback from potential users in the non-profit sector.
- **Integrate tRPC for remote procedure calls**, replacing traditional REST APIs for enhanced performance and simplicity.
- **Deploy a scalable solution on Vercel**, leveraging serverless architecture for ease of maintenance.

## Tech Stack

- **Next.js (Pages Router)**
- **React**
- **tRPC**
- **Tailwind CSS**
- **Typesense**
- **PostgreSQL (hosted via Supabase)**

## Features

CapDash includes a range of features that enhance the user experience and operational efficiency:

1. **OAuth Integration**: Secure user authentication via Google login.
2. **Infinite Scroll**: Seamless data fetching to keep users engaged.
3. **Fast Search**: Leveraging Typesense for real-time search functionality across large datasets.
4. **Real-time UI Updates**: Instant feedback with query invalidation for a dynamic, responsive user experience.
5. **Data Security**: Organizational data modeling ensures proper data segmentation and access control.
6. **Note and Interaction Tracking**: Users can track legislative interactions, notes, and tags for a comprehensive relationship management system.

## Next Steps

Since starting this project, I've gained considerable experience with the evolving Next.js ecosystem, including the introduction of the App Router. Additionally, I've refined my skills in UI/UX design, database architecture, and system engineering. My next step is to re-architect CapDash using the latest tools and best practices, continuing to grow as a developer and making this platform as impactful as possible for non-profits.
