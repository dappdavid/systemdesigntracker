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
  // CORE CONCEPTS
  {
    id: 'c1',
    title: 'Vertical vs Horizontal Scaling',
    category: Category.CORE_CONCEPTS,
    description: 'Understanding the trade-offs between adding more power (scale up) vs adding more machines (scale out).',
    status: Status.NOT_STARTED,
    isQuestion: false,
    difficulty: Difficulty.EASY
  },
  {
    id: 'c2',
    title: 'Load Balancing',
    category: Category.CORE_CONCEPTS,
    description: 'Techniques to distribute network traffic (L4 vs L7, Round Robin, Least Connections, Consistent Hashing).',
    status: Status.NOT_STARTED,
    isQuestion: false,
    difficulty: Difficulty.MEDIUM
  },
  {
    id: 'c3',
    title: 'Caching Strategies',
    category: Category.CORE_CONCEPTS,
    description: 'Write-through, Write-back, Write-around, Cache Eviction policies (LRU, LFU).',
    status: Status.NOT_STARTED,
    isQuestion: false,
    difficulty: Difficulty.MEDIUM
  },
  {
    id: 'c4',
    title: 'Content Delivery Network (CDN)',
    category: Category.CORE_CONCEPTS,
    description: 'Using CDNs to serve static assets with low latency globally. Push vs Pull zones.',
    status: Status.NOT_STARTED,
    isQuestion: false,
    difficulty: Difficulty.EASY
  },

  // DISTRIBUTED SYSTEMS
  {
    id: 'd1',
    title: 'CAP Theorem',
    category: Category.DISTRIBUTED_SYSTEMS,
    description: 'Consistency, Availability, Partition Tolerance. Understanding you can only pick two in a distributed system.',
    status: Status.NOT_STARTED,
    isQuestion: false,
    difficulty: Difficulty.MEDIUM
  },
  {
    id: 'd2',
    title: 'PACELC Theorem',
    category: Category.DISTRIBUTED_SYSTEMS,
    description: 'Extension of CAP that handles the "Else" case (when no partition exists) regarding Latency vs Consistency.',
    status: Status.NOT_STARTED,
    isQuestion: false,
    difficulty: Difficulty.HARD
  },
  {
    id: 'd3',
    title: 'Consistent Hashing',
    category: Category.DISTRIBUTED_SYSTEMS,
    description: 'Distributing requests across a changing set of servers with minimal remapping.',
    status: Status.NOT_STARTED,
    isQuestion: false,
    difficulty: Difficulty.HARD
  },
  {
    id: 'd4',
    title: 'Leader Election',
    category: Category.DISTRIBUTED_SYSTEMS,
    description: 'Algorithms like Raft or Paxos to select a coordinator in a distributed cluster.',
    status: Status.NOT_STARTED,
    isQuestion: false,
    difficulty: Difficulty.HARD
  },

  // DATA HANDLING
  {
    id: 'data1',
    title: 'Database Sharding',
    category: Category.DATA_HANDLING,
    description: 'Horizontal partitioning of data across multiple database instances.',
    status: Status.NOT_STARTED,
    isQuestion: false,
    difficulty: Difficulty.HARD
  },
  {
    id: 'data2',
    title: 'Replication Patterns',
    category: Category.DATA_HANDLING,
    description: 'Master-Slave, Master-Master, Quorum reads/writes.',
    status: Status.NOT_STARTED,
    isQuestion: false,
    difficulty: Difficulty.MEDIUM
  },
  {
    id: 'data3',
    title: 'Bloom Filters',
    category: Category.DATA_HANDLING,
    description: 'Probabilistic data structure to test set membership (efficiently checks if item is definitely NOT in set).',
    status: Status.NOT_STARTED,
    isQuestion: false,
    difficulty: Difficulty.MEDIUM
  },

  // ARCHITECTURAL PATTERNS
  {
    id: 'arch1',
    title: 'Microservices vs Monolith',
    category: Category.ARCHITECTURAL_PATTERNS,
    description: 'Pros/cons of service-oriented architecture, decoupling, and operational complexity.',
    status: Status.NOT_STARTED,
    isQuestion: false,
    difficulty: Difficulty.MEDIUM
  },
  {
    id: 'arch2',
    title: 'API Styles: REST vs RPC vs GraphQL',
    category: Category.ARCHITECTURAL_PATTERNS,
    description: 'Comparing communication protocols and data fetching strategies.',
    status: Status.NOT_STARTED,
    isQuestion: false,
    difficulty: Difficulty.MEDIUM
  },
  {
    id: 'arch3',
    title: 'Message Queues & Pub/Sub',
    category: Category.ARCHITECTURAL_PATTERNS,
    description: 'Asynchronous communication (Kafka, RabbitMQ) to decouple services and handle spikes.',
    status: Status.NOT_STARTED,
    isQuestion: false,
    difficulty: Difficulty.MEDIUM
  },

  // SYSTEM DESIGN PROBLEMS (THE QUESTIONS)
  {
    id: 'q1',
    title: 'Design a URL Shortener (TinyURL)',
    category: Category.SYSTEM_DESIGN_PROBLEMS,
    description: 'Focus on unique ID generation, heavy read vs write ratio, and redirection latency.',
    status: Status.NOT_STARTED,
    isQuestion: true,
    difficulty: Difficulty.EASY
  },
  {
    id: 'q2',
    title: 'Design a Web Crawler',
    category: Category.SYSTEM_DESIGN_PROBLEMS,
    description: 'Focus on politeness, scalability, deduplication (Bloom Filters), and parsing.',
    status: Status.NOT_STARTED,
    isQuestion: true,
    difficulty: Difficulty.MEDIUM
  },
  {
    id: 'q3',
    title: 'Design a Rate Limiter',
    category: Category.SYSTEM_DESIGN_PROBLEMS,
    description: 'Token Bucket, Leaky Bucket algorithms, distributed counting (Redis).',
    status: Status.NOT_STARTED,
    isQuestion: true,
    difficulty: Difficulty.MEDIUM
  },
  {
    id: 'q4',
    title: 'Design Instagram / Photo Sharing',
    category: Category.SYSTEM_DESIGN_PROBLEMS,
    description: 'Focus on image storage (Blob), CDN usage, and feed generation (Fan-out on write vs read).',
    status: Status.NOT_STARTED,
    isQuestion: true,
    difficulty: Difficulty.MEDIUM
  },
  {
    id: 'q5',
    title: 'Design Twitter / X (News Feed)',
    category: Category.SYSTEM_DESIGN_PROBLEMS,
    description: 'Timeline generation, celebrity problem (hot keys), hybrid approach.',
    status: Status.NOT_STARTED,
    isQuestion: true,
    difficulty: Difficulty.HARD
  },
  {
    id: 'q6',
    title: 'Design a Chat Application (WhatsApp)',
    category: Category.SYSTEM_DESIGN_PROBLEMS,
    description: 'Real-time communication (WebSockets), message persistence, last seen status.',
    status: Status.NOT_STARTED,
    isQuestion: true,
    difficulty: Difficulty.MEDIUM
  },
  {
    id: 'q7',
    title: 'Design Uber / Lyft',
    category: Category.SYSTEM_DESIGN_PROBLEMS,
    description: 'Geospatial indexing (QuadTrees, Geohash), matching algorithms, real-time location tracking.',
    status: Status.NOT_STARTED,
    isQuestion: true,
    difficulty: Difficulty.HARD
  },
  {
    id: 'q8',
    title: 'Design a Key-Value Store',
    category: Category.SYSTEM_DESIGN_PROBLEMS,
    description: 'Internals of DynamoDB/Cassandra. Tunable consistency, gossiping, SSTables, WAL.',
    status: Status.NOT_STARTED,
    isQuestion: true,
    difficulty: Difficulty.HARD
  },
    {
    id: 'q9',
    title: 'Design a Top K Leaderboard',
    category: Category.SYSTEM_DESIGN_PROBLEMS,
    description: 'Real-time sorting, stream processing, heavy write volume gaming scenarios.',
    status: Status.NOT_STARTED,
    isQuestion: true,
    difficulty: Difficulty.MEDIUM
  },
    {
    id: 'q10',
    title: 'Design a Unique ID Generator',
    category: Category.SYSTEM_DESIGN_PROBLEMS,
    description: 'Snowflake IDs, UUIDs, Multi-master database auto-increment challenges.',
    status: Status.NOT_STARTED,
    isQuestion: true,
    difficulty: Difficulty.EASY
  }
];

export const CATEGORY_ICONS: Record<Category, any> = {
  [Category.CORE_CONCEPTS]: Cpu,
  [Category.DATA_HANDLING]: Database,
  [Category.DISTRIBUTED_SYSTEMS]: Globe,
  [Category.ARCHITECTURAL_PATTERNS]: Layers,
  [Category.SYSTEM_DESIGN_PROBLEMS]: Network
};
