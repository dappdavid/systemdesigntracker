import { Category, Status, Topic, Difficulty } from './types';
import {
  Server,
  Database,
  Globe,
  Layout,
  Cpu,
  Shield,
  Zap,
  Layers,
  Network
} from 'lucide-react';

export const INITIAL_TOPICS: Topic[] = [
  // --- BEGINNER (Foundations) ---
  {
    id: 'b1',
    title: 'Client-Server Architecture',
    category: Category.CORE_CONCEPTS,
    description: 'The fundamental communication model where clients request resources and servers provide them.',
    status: Status.NOT_STARTED,
    isQuestion: false,
    difficulty: Difficulty.BEGINNER
  },
  {
    id: 'b2',
    title: 'Network Protocols: TCP vs UDP',
    category: Category.CORE_CONCEPTS,
    description: 'Reliable connection-oriented transmission (TCP) vs connectionless, fast transmission (UDP).',
    status: Status.NOT_STARTED,
    isQuestion: false,
    difficulty: Difficulty.BEGINNER
  },
  {
    id: 'b3',
    title: 'HTTP/HTTPS & REST APIs',
    category: Category.CORE_CONCEPTS,
    description: 'Stateless request/response protocol and standard architectural style for web APIs.',
    status: Status.NOT_STARTED,
    isQuestion: false,
    difficulty: Difficulty.BEGINNER
  },
  {
    id: 'b4',
    title: 'DNS (Domain Name System)',
    category: Category.CORE_CONCEPTS,
    description: 'How domain names are translated into IP addresses. A records, CNAME, TTL.',
    status: Status.NOT_STARTED,
    isQuestion: false,
    difficulty: Difficulty.BEGINNER
  },
  {
    id: 'b5',
    title: 'Vertical vs Horizontal Scaling',
    category: Category.CORE_CONCEPTS,
    description: 'The trade-off between adding more power (scale up) vs adding more machines (scale out).',
    status: Status.NOT_STARTED,
    isQuestion: false,
    difficulty: Difficulty.BEGINNER
  },
  {
    id: 'b6',
    title: 'SQL vs NoSQL Databases',
    category: Category.DATA_HANDLING,
    description: 'Structured (ACID, relational) vs Unstructured/Semi-structured (BASE, flexible schema) storage.',
    status: Status.NOT_STARTED,
    isQuestion: false,
    difficulty: Difficulty.BEGINNER
  },
  {
    id: 'b7',
    title: 'ACID Transactions',
    category: Category.DATA_HANDLING,
    description: 'Atomicity, Consistency, Isolation, Durability. The guarantees of relational databases.',
    status: Status.NOT_STARTED,
    isQuestion: false,
    difficulty: Difficulty.BEGINNER
  },
  {
    id: 'b8',
    title: 'WebSockets',
    category: Category.CORE_CONCEPTS,
    description: 'Full-duplex communication channels over a single TCP connection for real-time apps.',
    status: Status.NOT_STARTED,
    isQuestion: false,
    difficulty: Difficulty.BEGINNER
  },
  {
    id: 'b9',
    title: 'JSON & Protocol Buffers',
    category: Category.CORE_CONCEPTS,
    description: 'Data serialization formats. Human-readable text (JSON) vs efficient binary (Protobuf).',
    status: Status.NOT_STARTED,
    isQuestion: false,
    difficulty: Difficulty.BEGINNER
  },
  
  // --- INTERMEDIATE (Building Blocks) ---
  {
    id: 'i1',
    title: 'Load Balancing (L4 vs L7)',
    category: Category.CORE_CONCEPTS,
    description: 'Distributing traffic based on transport data (L4) or application content (L7). Algorithms like Round Robin.',
    status: Status.NOT_STARTED,
    isQuestion: false,
    difficulty: Difficulty.INTERMEDIATE
  },
  {
    id: 'i2',
    title: 'Caching Strategies',
    category: Category.CORE_CONCEPTS,
    description: 'Cache-Aside, Write-Through, Write-Back, Write-Around. Cache Eviction (LRU/LFU).',
    status: Status.NOT_STARTED,
    isQuestion: false,
    difficulty: Difficulty.INTERMEDIATE
  },
  {
    id: 'i3',
    title: 'Content Delivery Network (CDN)',
    category: Category.CORE_CONCEPTS,
    description: 'Geographically distributed network of proxy servers to serve static content fast.',
    status: Status.NOT_STARTED,
    isQuestion: false,
    difficulty: Difficulty.INTERMEDIATE
  },
  {
    id: 'i4',
    title: 'Database Replication',
    category: Category.DATA_HANDLING,
    description: 'Master-Slave (Read replicas), Master-Master configurations to improve availability and read throughput.',
    status: Status.NOT_STARTED,
    isQuestion: false,
    difficulty: Difficulty.INTERMEDIATE
  },
  {
    id: 'i5',
    title: 'Database Sharding (Partitioning)',
    category: Category.DATA_HANDLING,
    description: 'Splitting large datasets across multiple instances (Horizontal partitioning). Sharding keys.',
    status: Status.NOT_STARTED,
    isQuestion: false,
    difficulty: Difficulty.INTERMEDIATE
  },
  {
    id: 'i6',
    title: 'Reverse Proxy vs Forward Proxy',
    category: Category.CORE_CONCEPTS,
    description: 'Proxies that protect servers (Reverse) vs proxies that protect clients (Forward). Usage in security/caching.',
    status: Status.NOT_STARTED,
    isQuestion: false,
    difficulty: Difficulty.INTERMEDIATE
  },
  {
    id: 'i7',
    title: 'Microservices vs Monolith',
    category: Category.ARCHITECTURAL_PATTERNS,
    description: 'Decomposition of apps into loosely coupled services vs a single unified codebase.',
    status: Status.NOT_STARTED,
    isQuestion: false,
    difficulty: Difficulty.INTERMEDIATE
  },
  {
    id: 'i8',
    title: 'Message Queues (Pub/Sub)',
    category: Category.ARCHITECTURAL_PATTERNS,
    description: 'Asynchronous communication using Kafka/RabbitMQ. Decoupling producers and consumers.',
    status: Status.NOT_STARTED,
    isQuestion: false,
    difficulty: Difficulty.INTERMEDIATE
  },
  {
    id: 'i9',
    title: 'Rate Limiting Algorithms',
    category: Category.CORE_CONCEPTS,
    description: 'Token Bucket, Leaky Bucket, Fixed Window, Sliding Window Log, Sliding Window Counter.',
    status: Status.NOT_STARTED,
    isQuestion: false,
    difficulty: Difficulty.INTERMEDIATE
  },
  {
    id: 'i10',
    title: 'API Gateway',
    category: Category.ARCHITECTURAL_PATTERNS,
    description: 'Single entry point for back-end APIs. Handles authentication, routing, rate limiting.',
    status: Status.NOT_STARTED,
    isQuestion: false,
    difficulty: Difficulty.INTERMEDIATE
  },
  {
    id: 'i11',
    title: 'Database Indexing',
    category: Category.DATA_HANDLING,
    description: 'B-Trees, Hash Indexes. How indexes speed up reads but slow down writes.',
    status: Status.NOT_STARTED,
    isQuestion: false,
    difficulty: Difficulty.INTERMEDIATE
  },
  {
    id: 'i12',
    title: 'Short Polling vs Long Polling',
    category: Category.CORE_CONCEPTS,
    description: 'Techniques for real-time updates before WebSockets became standard.',
    status: Status.NOT_STARTED,
    isQuestion: false,
    difficulty: Difficulty.INTERMEDIATE
  },

  // --- ADVANCED (Distributed Systems Core) ---
  {
    id: 'a1',
    title: 'CAP Theorem',
    category: Category.DISTRIBUTED_SYSTEMS,
    description: 'In a distributed system, you can only pick two: Consistency, Availability, Partition Tolerance.',
    status: Status.NOT_STARTED,
    isQuestion: false,
    difficulty: Difficulty.ADVANCED
  },
  {
    id: 'a2',
    title: 'Consistent Hashing',
    category: Category.DISTRIBUTED_SYSTEMS,
    description: 'Distributed hashing scheme that minimizes reorganization when nodes are added or removed.',
    status: Status.NOT_STARTED,
    isQuestion: false,
    difficulty: Difficulty.ADVANCED
  },
  {
    id: 'a3',
    title: 'Bloom Filters',
    category: Category.DATA_HANDLING,
    description: 'Probabilistic data structure that tells you if an element is definitely NOT in a set.',
    status: Status.NOT_STARTED,
    isQuestion: false,
    difficulty: Difficulty.ADVANCED
  },
  {
    id: 'a4',
    title: 'Distributed Transactions (2PC & Sagas)',
    category: Category.DISTRIBUTED_SYSTEMS,
    description: 'Two-Phase Commit protocol vs Saga Pattern (Choreography/Orchestration) for microservices.',
    status: Status.NOT_STARTED,
    isQuestion: false,
    difficulty: Difficulty.ADVANCED
  },
  {
    id: 'a5',
    title: 'Leader Election',
    category: Category.DISTRIBUTED_SYSTEMS,
    description: 'Selecting a coordinator node in a cluster. Basics of why we need a "master".',
    status: Status.NOT_STARTED,
    isQuestion: false,
    difficulty: Difficulty.ADVANCED
  },
  {
    id: 'a6',
    title: 'Distributed ID Generation',
    category: Category.DISTRIBUTED_SYSTEMS,
    description: 'Generating unique IDs across multiple nodes without coordination. Twitter Snowflake, UUIDs.',
    status: Status.NOT_STARTED,
    isQuestion: false,
    difficulty: Difficulty.ADVANCED
  },
  {
    id: 'a7',
    title: 'PACELC Theorem',
    category: Category.DISTRIBUTED_SYSTEMS,
    description: 'Extension of CAP. If there is a partition (P), trade A vs C. Else (E), trade Latency (L) vs Consistency (C).',
    status: Status.NOT_STARTED,
    isQuestion: false,
    difficulty: Difficulty.ADVANCED
  },
  {
    id: 'a8',
    title: 'Structured Logging & Tracing',
    category: Category.ARCHITECTURAL_PATTERNS,
    description: 'Observability in distributed systems. Distributed tracing (OpenTelemetry, Jaeger).',
    status: Status.NOT_STARTED,
    isQuestion: false,
    difficulty: Difficulty.ADVANCED
  },
  {
    id: 'a9',
    title: 'Quadtrees & Geohashing',
    category: Category.DATA_HANDLING,
    description: 'Spatial indexing structures for location-based services (like Uber/Yelp).',
    status: Status.NOT_STARTED,
    isQuestion: false,
    difficulty: Difficulty.ADVANCED
  },
  {
    id: 'a10',
    title: 'Count-Min Sketch',
    category: Category.DATA_HANDLING,
    description: 'Probabilistic frequency estimation (e.g., "Trending Topics") using minimal memory.',
    status: Status.NOT_STARTED,
    isQuestion: false,
    difficulty: Difficulty.ADVANCED
  },
  {
    id: 'a11',
    title: 'LSM Trees vs B+ Trees',
    category: Category.DATA_HANDLING,
    description: 'Storage engines. Log-Structured Merge Trees (Write-heavy, e.g., Cassandra) vs B+ Trees (Read-heavy, e.g., SQL).',
    status: Status.NOT_STARTED,
    isQuestion: false,
    difficulty: Difficulty.ADVANCED
  },
  {
    id: 'a12',
    title: 'Backpressure',
    category: Category.ARCHITECTURAL_PATTERNS,
    description: 'Strategies for handling a system that receives data faster than it can process it.',
    status: Status.NOT_STARTED,
    isQuestion: false,
    difficulty: Difficulty.ADVANCED
  },

  // --- EXPERT (Deep Dive) ---
  {
    id: 'e1',
    title: 'Consensus Algorithms (Paxos, Raft)',
    category: Category.DISTRIBUTED_SYSTEMS,
    description: 'How distributed nodes agree on a single value reliably even if some nodes fail.',
    status: Status.NOT_STARTED,
    isQuestion: false,
    difficulty: Difficulty.EXPERT
  },
  {
    id: 'e2',
    title: 'Gossip Protocols',
    category: Category.DISTRIBUTED_SYSTEMS,
    description: 'Epidemic inter-node communication for failure detection and state propagation (e.g., Cassandra).',
    status: Status.NOT_STARTED,
    isQuestion: false,
    difficulty: Difficulty.EXPERT
  },
  {
    id: 'e3',
    title: 'Vector Clocks & Lamport Timestamps',
    category: Category.DISTRIBUTED_SYSTEMS,
    description: 'Logical clocks to order events in a distributed system where physical clocks are unreliable.',
    status: Status.NOT_STARTED,
    isQuestion: false,
    difficulty: Difficulty.EXPERT
  },
  {
    id: 'e4',
    title: 'CRDTs (Conflict-free Replicated Data Types)',
    category: Category.DATA_HANDLING,
    description: 'Data structures that allow concurrent updates from multiple replicas without conflicts (e.g., Google Docs).',
    status: Status.NOT_STARTED,
    isQuestion: false,
    difficulty: Difficulty.EXPERT
  },
  {
    id: 'e5',
    title: 'Quorum (N, R, W)',
    category: Category.DISTRIBUTED_SYSTEMS,
    description: 'Tunable consistency levels in Dynamo-style databases. R + W > N ensures strong consistency.',
    status: Status.NOT_STARTED,
    isQuestion: false,
    difficulty: Difficulty.EXPERT
  },
  {
    id: 'e6',
    title: 'Lambda vs Kappa Architecture',
    category: Category.ARCHITECTURAL_PATTERNS,
    description: 'Big Data processing architectures. Batch + Speed layers (Lambda) vs Stream-only (Kappa).',
    status: Status.NOT_STARTED,
    isQuestion: false,
    difficulty: Difficulty.EXPERT
  },
  {
    id: 'e7',
    title: 'Merkle Trees',
    category: Category.DATA_HANDLING,
    description: 'Hash trees used to verify data consistency efficiently between replicas (e.g., DynamoDB, Git).',
    status: Status.NOT_STARTED,
    isQuestion: false,
    difficulty: Difficulty.EXPERT
  },
  {
    id: 'e8',
    title: 'Isolation Levels',
    category: Category.DATA_HANDLING,
    description: 'Deep dive into Read Uncommitted, Read Committed, Repeatable Read, Snapshot Isolation, Serializable.',
    status: Status.NOT_STARTED,
    isQuestion: false,
    difficulty: Difficulty.EXPERT
  },
  {
    id: 'e9',
    title: 'HyperLogLog',
    category: Category.DATA_HANDLING,
    description: 'Approximating the number of distinct elements in a multiset with very small memory usage.',
    status: Status.NOT_STARTED,
    isQuestion: false,
    difficulty: Difficulty.EXPERT
  },

  // --- SYSTEM DESIGN PROBLEMS (Application of Concepts) ---
  {
    id: 'q1',
    title: 'Design a URL Shortener (TinyURL)',
    category: Category.SYSTEM_DESIGN_PROBLEMS,
    description: 'Classic easy problem. Focus on hashing, ID generation, redirection, and read/write ratio.',
    status: Status.NOT_STARTED,
    isQuestion: true,
    difficulty: Difficulty.BEGINNER
  },
  {
    id: 'q2',
    title: 'Design a Pastebin',
    category: Category.SYSTEM_DESIGN_PROBLEMS,
    description: 'Similar to URL shortener but with object storage focus and expiration policies.',
    status: Status.NOT_STARTED,
    isQuestion: true,
    difficulty: Difficulty.BEGINNER
  },
  {
    id: 'q3',
    title: 'Design a Rate Limiter',
    category: Category.SYSTEM_DESIGN_PROBLEMS,
    description: 'Middleware design. Distributed counter challenges, sliding windows, Redis usage.',
    status: Status.NOT_STARTED,
    isQuestion: true,
    difficulty: Difficulty.INTERMEDIATE
  },
  {
    id: 'q4',
    title: 'Design a Chat System (WhatsApp)',
    category: Category.SYSTEM_DESIGN_PROBLEMS,
    description: 'Real-time messaging, WebSockets, online status (heartbeats), message ordering.',
    status: Status.NOT_STARTED,
    isQuestion: true,
    difficulty: Difficulty.INTERMEDIATE
  },
  {
    id: 'q5',
    title: 'Design Instagram (Photo Sharing)',
    category: Category.SYSTEM_DESIGN_PROBLEMS,
    description: 'Blob storage, feed generation (Fan-out on write/read), CDN integration.',
    status: Status.NOT_STARTED,
    isQuestion: true,
    difficulty: Difficulty.INTERMEDIATE
  },
  {
    id: 'q6',
    title: 'Design a Web Crawler',
    category: Category.SYSTEM_DESIGN_PROBLEMS,
    description: 'Scheduling, politeness, DNS resolution, deduplication (Bloom filters).',
    status: Status.NOT_STARTED,
    isQuestion: true,
    difficulty: Difficulty.INTERMEDIATE
  },
  {
    id: 'q7',
    title: 'Design a Notification System',
    category: Category.SYSTEM_DESIGN_PROBLEMS,
    description: 'Plug-and-play architecture for Email, SMS, Push. Queues, retry logic, rate limiting.',
    status: Status.NOT_STARTED,
    isQuestion: true,
    difficulty: Difficulty.INTERMEDIATE
  },
  {
    id: 'q8',
    title: 'Design Twitter (News Feed)',
    category: Category.SYSTEM_DESIGN_PROBLEMS,
    description: 'Complex fan-out. Handling celebrities (hot partition problem), hybrid push/pull models.',
    status: Status.NOT_STARTED,
    isQuestion: true,
    difficulty: Difficulty.ADVANCED
  },
  {
    id: 'q9',
    title: 'Design Uber/Lyft',
    category: Category.SYSTEM_DESIGN_PROBLEMS,
    description: 'Geospatial heavy. Driver matching, location tracking, QuadTrees vs Geohashing.',
    status: Status.NOT_STARTED,
    isQuestion: true,
    difficulty: Difficulty.ADVANCED
  },
  {
    id: 'q10',
    title: 'Design Google Drive / Dropbox',
    category: Category.SYSTEM_DESIGN_PROBLEMS,
    description: 'File synchronization, chunking, deduplication, block storage vs object storage, offline sync.',
    status: Status.NOT_STARTED,
    isQuestion: true,
    difficulty: Difficulty.ADVANCED
  },
  {
    id: 'q11',
    title: 'Design Netflix / YouTube',
    category: Category.SYSTEM_DESIGN_PROBLEMS,
    description: 'Video streaming (HLS/DASH), adaptive bitrate, CDN optimization, transcoding pipeline.',
    status: Status.NOT_STARTED,
    isQuestion: true,
    difficulty: Difficulty.ADVANCED
  },
  {
    id: 'q12',
    title: 'Design a Distributed Key-Value Store',
    category: Category.SYSTEM_DESIGN_PROBLEMS,
    description: 'Recreating DynamoDB/Cassandra. Partitioning, Replication, Consistency, Tunability.',
    status: Status.NOT_STARTED,
    isQuestion: true,
    difficulty: Difficulty.EXPERT
  },
  {
    id: 'q13',
    title: 'Design a Top-K Leaderboard',
    category: Category.SYSTEM_DESIGN_PROBLEMS,
    description: 'Real-time high volume writes. Stream processing, approximate sorting vs accurate sorting.',
    status: Status.NOT_STARTED,
    isQuestion: true,
    difficulty: Difficulty.EXPERT
  },
  {
    id: 'q14',
    title: 'Design a Payment System',
    category: Category.SYSTEM_DESIGN_PROBLEMS,
    description: 'Zero tolerance for data loss. Idempotency, double-entry ledger, distributed transactions.',
    status: Status.NOT_STARTED,
    isQuestion: true,
    difficulty: Difficulty.EXPERT
  }
];

export const CATEGORY_ICONS: Record<Category, any> = {
  [Category.CORE_CONCEPTS]: Cpu,
  [Category.DATA_HANDLING]: Database,
  [Category.DISTRIBUTED_SYSTEMS]: Globe,
  [Category.ARCHITECTURAL_PATTERNS]: Layers,
  [Category.SYSTEM_DESIGN_PROBLEMS]: Network
};