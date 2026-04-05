// ═══ Days 46-90 Deep Dive Readings — ALL UNIQUE ═══
// Day 46
DAILY_READINGS.push([{ tag: "performance", title: "Connection Pool Tuning — The Formula", desc: "Optimal pool size = Tn × (Cm - 1) + 1. Why 'more connections' often means slower responses.", src: "HikariCP Wiki", time: "15 min" },
{ tag: "architecture", title: "Service Discovery — Consul vs Eureka vs K8s DNS", desc: "Client-side vs server-side discovery. DNS-based (K8s), AP (Eureka), CP (Consul). Trade-offs.", src: "microservices.io", time: "20 min" },
{ tag: "cloud", title: "AWS RDS Proxy — Connection Multiplexing", desc: "Pooling DB connections for Lambda/serverless. IAM auth, failover handling. When it's worth the cost.", src: "AWS Blog", time: "20 min" }]);
// Day 47
DAILY_READINGS.push([{ tag: "kafka", title: "Kafka Transactions — Atomic Multi-Topic Writes", desc: "Transactional producer, read_committed consumers, zombie fencing. Building consistent event pipelines.", src: "Confluent Blog", time: "25 min" },
{ tag: "database", title: "SQLite — The Most Deployed Database in the World", desc: "B-tree page format, WAL mode, single-writer architecture. Why Litestream changes the game.", src: "SQLite Docs", time: "20 min" },
{ tag: "distributed", title: "Lease-Based Locking in Distributed Systems", desc: "Lock with TTL, fencing tokens, leader leases. Why distributed locking is harder than you think.", src: "Martin Kleppmann", time: "25 min" }]);
// Day 48
DAILY_READINGS.push([{ tag: "redis", title: "RedisJSON + RediSearch — Full-Stack Redis", desc: "Store JSON documents, create secondary indexes, full-text search. Redis as primary database.", src: "Redis Labs", time: "25 min" },
{ tag: "cloud", title: "AWS Graviton — ARM for 40% Cost Savings", desc: "Graviton3 instances, workload compatibility, Java on ARM, containerized migration strategies.", src: "AWS Compute Blog", time: "20 min" },
{ tag: "performance", title: "DNS Resolution — The Hidden Latency Killer", desc: "DNS caching, TTL strategies, DNS-over-HTTPS, service mesh DNS. Reducing DNS lookup from 100ms to 1ms.", src: "Cloudflare Blog", time: "15 min" }]);
// Day 49
DAILY_READINGS.push([{ tag: "database", title: "Foreign Data Wrappers — PostgreSQL Federation", desc: "Access MySQL, MongoDB, Redis, S3 from PostgreSQL. Multi-database queries without application changes.", src: "PostgreSQL Wiki", time: "20 min" },
{ tag: "architecture", title: "Testing in Production — Safely", desc: "Feature flags, canary analysis, traffic shadowing, chaos engineering. Not as crazy as it sounds.", src: "Cindy Sridharan", time: "25 min" },
{ tag: "distributed", title: "Operational Transform vs CRDT — Real-time Collab", desc: "Google Docs (OT) vs Figma (CRDT) approaches. Trade-offs in complexity, performance, correctness.", src: "Figma Engineering", time: "25 min" }]);
// Day 50
DAILY_READINGS.push([{ tag: "kafka", title: "Kafka Mirror Maker 2 — Cross-Cluster Replication", desc: "Bi-directional replication, consumer offset sync, topic renaming. Multi-region Kafka architecture.", src: "Confluent", time: "25 min" },
{ tag: "redis", title: "Redis Object Cache Pattern", desc: "Serialization strategies (JSON vs MessagePack vs Protobuf), cache warming, thundering herd protection.", src: "Redis University", time: "20 min" },
{ tag: "cloud", title: "Observability Stack — Prometheus + Grafana + Loki", desc: "Metrics (Prometheus), logs (Loki), dashboards (Grafana). PromQL queries, alerting rules. Full stack setup.", src: "Grafana Labs", time: "25 min" }]);
// Day 51
DAILY_READINGS.push([{ tag: "database", title: "Temporal Tables — Time Travel in SQL", desc: "System-versioned temporal tables, AS OF queries, audit trails. Supported in PostgreSQL, MariaDB.", src: "SQL Standard", time: "20 min" },
{ tag: "distributed", title: "Chaos Engineering — Breaking Things on Purpose", desc: "Steady-state hypothesis, blast radius, Netflix Chaos Monkey, Gremlin. Building confidence in resilience.", src: "Principles of Chaos", time: "25 min" },
{ tag: "performance", title: "Memory-Mapped Files — When to Use mmap", desc: "mmap vs read/write, page faults, TLB, huge pages. When mmap is faster and when it's not.", src: "Linux Kernel Docs", time: "20 min" }]);
// Day 52
DAILY_READINGS.push([{ tag: "architecture", title: "Cell-Based Architecture — Blast Radius Reduction", desc: "Partition infrastructure into cells. Each cell is independent. Used by AWS, Azure for isolation.", src: "AWS Architecture Blog", time: "25 min" },
{ tag: "kafka", title: "Kafka Quotas — Protecting Shared Infrastructure", desc: "Network bandwidth quotas, request rate quotas. Fair sharing in multi-tenant Kafka environments.", src: "Confluent Docs", time: "15 min" },
{ tag: "cloud", title: "AWS Cost Optimization — Real Strategies", desc: "Reserved instances, Savings Plans, spot instances, right-sizing, S3 intelligent tiering. 40% savings.", src: "AWS Cost Blog", time: "25 min" }]);
// Day 53
DAILY_READINGS.push([{ tag: "redis", title: "Redis ACLs — Security Best Practices", desc: "User-level permissions, command restrictions, key pattern matching. Securing production Redis.", src: "Redis.io", time: "15 min" },
{ tag: "database", title: "FoundationDB — Apple's Secret Database", desc: "Ordered key-value store, layer concept, simulation testing. How Apple runs CloudKit and iCloud.", src: "FoundationDB Docs", time: "25 min" },
{ tag: "distributed", title: "Data Locality — When to Move Compute to Data", desc: "Network is the bottleneck. Push computation to data nodes (Spark, CockroachDB). Rack awareness.", src: "Hadoop Architecture", time: "20 min" }]);
// Day 54
DAILY_READINGS.push([{ tag: "performance", title: "Tail Latency — The p99 Problem", desc: "Why p99 matters more than average. Hedged requests, backup requests, deadline propagation.", src: "Jeff Dean, Google", time: "20 min" },
{ tag: "architecture", title: "Data Mesh — Federated Data Ownership", desc: "Domain-oriented data ownership, data as a product, self-serve platform, federated governance.", src: "Zhamak Dehghani", time: "25 min" },
{ tag: "cloud", title: "AWS OpenSearch vs Elasticsearch", desc: "Fork differences, UltraWarm (S3 tier), serverless option. Running search at scale on AWS.", src: "AWS Blog", time: "20 min" }]);
// Day 55
DAILY_READINGS.push([{ tag: "kafka", title: "Kafka + Flink — Stream Processing Pipeline", desc: "Exactly-once with Kafka sink, checkpointing, savepoints. Building real-time ETL with Flink SQL.", src: "Apache Flink Docs", time: "30 min" },
{ tag: "database", title: "Materialized Views — Precomputed Query Results", desc: "Eager vs lazy refresh. Incremental materialized views. When to use: dashboards, aggregations.", src: "PostgreSQL Docs", time: "20 min" },
{ tag: "distributed", title: "Quorum Reads/Writes — Tunable Consistency", desc: "W + R > N formula. Configuring consistency per operation. Cassandra/Dynamo approach.", src: "Dynamo Paper", time: "20 min" }]);
// Day 56
DAILY_READINGS.push([{ tag: "redis", title: "Redis Functions — Server-Side Logic", desc: "Redis 7.0 Functions replacing Lua. Libraries, FCALL, atomic execution. Stored procedures in Redis.", src: "Redis.io", time: "20 min" },
{ tag: "cloud", title: "Multi-Cloud Strategy — Myth vs Reality", desc: "Portability costs, lowest common denominator, data gravity. When multi-cloud actually makes sense.", src: "Corey Quinn", time: "20 min" },
{ tag: "performance", title: "CPU Cache Lines & False Sharing", desc: "L1/L2/L3 cache hierarchy, 64-byte cache lines, padding to avoid false sharing. @Contended in Java.", src: "Mechanical Sympathy", time: "25 min" }]);
// Day 57
DAILY_READINGS.push([{ tag: "database", title: "Vacuum Internals — PostgreSQL's Achilles Heel", desc: "Dead tuple accumulation, aggressive vacuum, pg_repack for bloat, table/index bloat monitoring.", src: "PgAnalyze", time: "25 min" },
{ tag: "architecture", title: "Backends at Scale — Instacart Architecture", desc: "Rails monolith → microservices. Event sourcing, CQRS, real-time inventory. Scaling to 700K orders/day.", src: "Instacart Tech Blog", time: "25 min" },
{ tag: "distributed", title: "Chubby — Google's Distributed Lock Service", desc: "Paxos-based, lock sequencer, event notifications. Foundation of BigTable, GFS, MapReduce.", src: "Google Research", time: "25 min" }]);
// Day 58
DAILY_READINGS.push([{ tag: "kafka", title: "Kafka Exactly-Once End-to-End", desc: "Idempotent producer + transactional consumer + exactly-once Streams. True E2E semantics.", src: "Confluent Blog", time: "25 min" },
{ tag: "redis", title: "Redis as Primary Database — Yes or No?", desc: "When Redis can be your primary store. Durability with AOF+fsync, replication for HA. Trade-offs.", src: "Redis Labs", time: "20 min" },
{ tag: "cloud", title: "AWS DMS — Database Migration At Scale", desc: "Homogeneous & heterogeneous migrations. CDC replication, schema conversion. Zero-downtime cutovers.", src: "AWS Blog", time: "20 min" }]);
// Day 59
DAILY_READINGS.push([{ tag: "database", title: "B+ Tree vs B-Tree — Why Databases Choose B+", desc: "Sequential access optimization, all data in leaves, linked leaf nodes. Range query performance.", src: "CMU Database Course", time: "20 min" },
{ tag: "performance", title: "TCP Optimization for Microservices", desc: "TCP_FASTOPEN, keep-alive, Nagle's algorithm, initial congestion window. Network-level optimizations.", src: "High Performance Browser Networking", time: "25 min" },
{ tag: "distributed", title: "Exactly-Once Is NOT Exactly Once", desc: "The impossibility result, practical approximations, idempotent operations, deduplication windows.", src: "Pat Helland, Microsoft", time: "20 min" }]);
// Day 60
DAILY_READINGS.push([{ tag: "architecture", title: "Staff Engineer — Technical Leadership Without Managing", desc: "Exploration, teaching, sponsorship, guardrails, context setting. The Staff+ engineering path.", src: "Will Larson", time: "30 min" },
{ tag: "kafka", title: "Kafka at LinkedIn — The Origin Story", desc: "Why LinkedIn built Kafka. Activity tracking, operational metrics, log aggregation at LinkedIn scale.", src: "Jay Kreps Blog", time: "25 min" },
{ tag: "cloud", title: "Disaster Recovery Strategies — RPO & RTO", desc: "Backup/restore, pilot light, warm standby, multi-site active. Choosing the right DR strategy.", src: "AWS DR Whitepaper", time: "25 min" }]);
// Day 61
DAILY_READINGS.push([{ tag: "redis", title: "Redis Cluster Resharding — Production Guide", desc: "Adding/removing nodes, slot migration, rebalancing. Zero-downtime Redis cluster expansion.", src: "Redis.io", time: "25 min" },
{ tag: "database", title: "Logical Replication — PostgreSQL CDC", desc: "Publication/subscription model, selective replication, schema changes. Database-native CDC.", src: "PostgreSQL Docs", time: "20 min" },
{ tag: "distributed", title: "Phi Accrual Failure Detector", desc: "Probabilistic failure detection. Adaptive thresholds vs fixed timeouts. Used by Akka, Cassandra.", src: "Akka Docs", time: "15 min" }]);
// Day 62
DAILY_READINGS.push([{ tag: "performance", title: "Object Allocation — Stack vs Heap vs TLAB", desc: "Escape analysis, scalar replacement, TLAB allocation. Making the JVM's allocator your friend.", src: "Aleksey Shipilëv", time: "25 min" },
{ tag: "architecture", title: "Platform Engineering — Developer Experience", desc: "Internal developer platforms, golden paths, self-service infrastructure. Spotify's Backstage.", src: "Team Topologies", time: "25 min" },
{ tag: "cloud", title: "AWS PrivateLink — Secure Service Communication", desc: "VPC endpoints, interface endpoints, gateway endpoints. Private connectivity without internet exposure.", src: "AWS Networking Blog", time: "20 min" }]);
// Day 63-70
DAILY_READINGS.push([{ tag: "kafka", title: "Kafka Cruise Control — Auto-Rebalancing", desc: "Automatic partition assignment, broker load balancing, self-healing clusters. LinkedIn's project.", src: "Cruise Control Docs", time: "20 min" },
{ tag: "database", title: "Multi-Model Databases — ArangoDB, Cosmos DB", desc: "Document + Graph + Key-Value in one engine. Polyglot persistence without polyglot infrastructure.", src: "ArangoDB Blog", time: "20 min" },
{ tag: "distributed", title: "Backpressure — Flow Control in Distributed Systems", desc: "Reactive Streams, TCP flow control, bounded queues, load shedding. Preventing system collapse.", src: "Reactive Manifesto", time: "20 min" }]);
DAILY_READINGS.push([{ tag: "redis", title: "Redis + Kafka — Event-Driven Caching", desc: "Cache invalidation via Kafka CDC events. Debezium → Kafka → Redis Sink. Eventually consistent cache.", src: "Confluent Blog", time: "25 min" },
{ tag: "cloud", title: "AWS SageMaker — ML Infrastructure", desc: "Training, hosting, MLOps pipelines. Feature store, model monitoring, A/B testing for ML models.", src: "AWS ML Blog", time: "25 min" },
{ tag: "performance", title: "Benchmark Pitfalls — How to Measure Correctly", desc: "JMH for Java, wrk for HTTP, pgbench for PostgreSQL. Warm-up, statistical significance, outliers.", src: "Aleksey Shipilëv", time: "20 min" }]);
DAILY_READINGS.push([{ tag: "database", title: "PostgreSQL pg_stat_statements — Query Analytics", desc: "Top queries by time/calls, mean execution time, cache hit ratio. Performance monitoring essentials.", src: "PgAnalyze", time: "15 min" },
{ tag: "architecture", title: "Modular Monolith — Best of Both Worlds", desc: "Clear module boundaries, internal APIs, independent deployment path. Migration strategy to microservices.", src: "Kamil Grzybek", time: "25 min" },
{ tag: "distributed", title: "Spanner's TrueTime — Synchronized Clocks", desc: "GPS + atomic clocks for bounded clock uncertainty (<7ms). Enabling externally consistent transactions.", src: "Google Research", time: "25 min" }]);
DAILY_READINGS.push([{ tag: "kafka", title: "Kafka + ClickHouse — Real-Time Analytics Pipeline", desc: "Kafka → ClickHouse Kafka engine → MaterializedView. Sub-second analytics on streaming data.", src: "ClickHouse Docs", time: "25 min" },
{ tag: "redis", title: "Redis Search Query Language — RediSearch 2.0", desc: "Full-text search, secondary indexing, aggregations, auto-suggest. Building search with Redis.", src: "Redis Labs", time: "20 min" },
{ tag: "cloud", title: "AWS Systems Manager — Fleet Management", desc: "SSM Agent, Parameter Store, Session Manager. Managing 10K+ instances without SSH.", src: "AWS Operations Blog", time: "20 min" }]);
DAILY_READINGS.push([{ tag: "database", title: "Cassandra Architecture — Gossip, Hinted Handoff", desc: "Token ring, virtual nodes, SSTable compaction, read repair. AP database internals.", src: "Cassandra Docs", time: "25 min" },
{ tag: "performance", title: "NUMA-Aware Programming", desc: "Non-Uniform Memory Access, socket affinity, memory allocation policy. 2x gains on multi-socket servers.", src: "Linux Kernel Docs", time: "25 min" },
{ tag: "distributed", title: "HashiCorp Consul — Service Mesh + Config", desc: "Service discovery, health checking, KV store, Connect (sidecar proxy), intentions. Full mesh solution.", src: "HashiCorp Learn", time: "25 min" }]);
DAILY_READINGS.push([{ tag: "architecture", title: "Rate Limiting Algorithms — Deep Comparison", desc: "Fixed window, sliding window log, sliding window counter, token bucket, leaky bucket. Code + trade-offs.", src: "Kong Blog", time: "25 min" },
{ tag: "kafka", title: "Kafka Observability — Metrics That Matter", desc: "Under-replicated partitions, ISR shrink rate, request latency, log flush latency. Top 15 metrics.", src: "Datadog Blog", time: "20 min" },
{ tag: "cloud", title: "AWS Global Accelerator — Anycast Networking", desc: "Static IPs, anycast routing, instant region failover. When CloudFront isn't enough.", src: "AWS Networking Blog", time: "15 min" }]);
DAILY_READINGS.push([{ tag: "redis", title: "Redis Best Practices — Key Naming & Design", desc: "Key naming conventions, TTL strategies, big key avoidance, pipeline batching, memory analysis.", src: "Redis.io", time: "20 min" },
{ tag: "database", title: "PostgreSQL Advisory Locks — Application-Level Locking", desc: "pg_advisory_lock, pg_try_advisory_lock. Distributed locking with PostgreSQL. Idempotent job processing.", src: "PostgreSQL Docs", time: "20 min" },
{ tag: "distributed", title: "Byzantine Fault Tolerance — PBFT", desc: "Handling malicious nodes, 3f+1 requirement, pre-prepare/prepare/commit phases. Blockchain foundations.", src: "PBFT Paper", time: "25 min" }]);
// Days 71-80
DAILY_READINGS.push([{ tag: "performance", title: "Write Amplification — The Hidden Cost", desc: "LSM-tree, SSD wear leveling, RocksDB compaction. How writes silently multiply and slow everything.", src: "RocksDB Wiki", time: "20 min" },
{ tag: "architecture", title: "Edge Computing Architecture Patterns", desc: "Computation at CDN edges, IoT gateways, local inference. AWS Wavelength, CloudFront Functions.", src: "AWS Edge Blog", time: "25 min" },
{ tag: "cloud", title: "Pulumi vs Terraform — Next-Gen IaC", desc: "General-purpose languages vs HCL. State management, testing, component reuse. Decision framework.", src: "Pulumi Blog", time: "20 min" }]);
DAILY_READINGS.push([{ tag: "kafka", title: "Apache Pulsar vs Kafka — Fair Comparison", desc: "Segment storage, geo-replication, multi-tenancy, function framework. Where Pulsar excels.", src: "StreamNative Blog", time: "25 min" },
{ tag: "database", title: "Vector Databases — Milvus, Pinecone, Weaviate", desc: "Embedding storage, ANN search (HNSW, IVF), semantic search. The AI-era database.", src: "Pinecone Docs", time: "25 min" },
{ tag: "distributed", title: "Exactly-Once Delivery — The Outbox Pattern", desc: "Transactional outbox + CDC relay. Guaranteeing event publishing without two-phase commit.", src: "microservices.io", time: "20 min" }]);
DAILY_READINGS.push([{ tag: "redis", title: "Redis 7.0 — Multi-Part AOF & Functions", desc: "Sharded Pub/Sub, multi-part AOF for faster rewrite, Redis Functions replacing Lua scripting.", src: "Redis.io", time: "20 min" },
{ tag: "cloud", title: "FinOps — Cloud Financial Management", desc: "Unit cost metrics, showback/chargeback, right-sizing automation, reserved instance management.", src: "FinOps Foundation", time: "25 min" },
{ tag: "performance", title: "Amdahl's Law & Universal Scalability Law", desc: "Serial fraction limits parallelism. USL adds contention + coherency. Predicting scaling limits.", src: "Neil Gunther", time: "20 min" }]);
DAILY_READINGS.push([{ tag: "database", title: "Database Proxy — ProxySQL, PgBouncer, Vitess VTGate", desc: "Query routing, connection multiplexing, read/write splitting, query caching. Layer between app & DB.", src: "ProxySQL Blog", time: "20 min" },
{ tag: "architecture", title: "Webhook Infrastructure at Scale", desc: "Retry with exponential backoff, dead letter queues, signature verification, rate limiting senders.", src: "Svix Blog", time: "20 min" },
{ tag: "distributed", title: "Anti-Entropy Repair — Cassandra Read Repair", desc: "Merkle tree comparison, streaming repair, full vs incremental. Maintaining consistency in AP systems.", src: "Cassandra Docs", time: "20 min" }]);
DAILY_READINGS.push([{ tag: "kafka", title: "Redpanda — Kafka API-Compatible C++ Broker", desc: "No JVM, no ZooKeeper, thread-per-core. 10x lower latency, simpler operations. Kafka replacement?", src: "Redpanda Blog", time: "20 min" },
{ tag: "redis", title: "Redis Pub/Sub at Scale — Pitfalls", desc: "Message loss when subscriber disconnects, slow subscribers blocking. Streams as reliable alternative.", src: "Redis.io", time: "15 min" },
{ tag: "cloud", title: "AWS Secrets Manager vs SSM Parameter Store", desc: "Auto-rotation, cross-account sharing, RDS integration. Cost comparison and use case guide.", src: "AWS Security Blog", time: "15 min" }]);
DAILY_READINGS.push([{ tag: "performance", title: "REST API Performance Optimization", desc: "Pagination (cursor vs offset), sparse fields, compression, ETags, connection reuse. 10x faster APIs.", src: "API Design Guide", time: "20 min" },
{ tag: "database", title: "PostgreSQL CTEs — Optimization Fence Removal", desc: "WITH queries, recursive CTEs, materialized vs inlined CTEs (PG12+). Query plan impact.", src: "PostgreSQL Docs", time: "20 min" },
{ tag: "distributed", title: "Borg, Omega, Kubernetes — Evolution", desc: "Google's container orchestration evolution. From Borg (job scheduling) to Kubernetes (declarative APIs).", src: "Google Research", time: "25 min" }]);
DAILY_READINGS.push([{ tag: "architecture", title: "Scaling WebSockets — Connection Management", desc: "Sticky sessions, Redis Pub/Sub for fanout, connection draining, heartbeat mechanism. 1M+ connections.", src: "Socket.io Docs", time: "25 min" },
{ tag: "kafka", title: "Kafka AdminClient API — Programmatic Ops", desc: "Create/delete topics, alter configs, consumer group management. Automating Kafka operations.", src: "Confluent Docs", time: "15 min" },
{ tag: "cloud", title: "AWS AppSync — Managed GraphQL", desc: "Real-time subscriptions, offline support, DynamoDB resolvers, pipeline resolvers. Serverless GraphQL.", src: "AWS Blog", time: "20 min" }]);
// Days 81-90
DAILY_READINGS.push([{ tag: "redis", title: "Building a Distributed Lock with Redis (Redlock)", desc: "Martin Kleppmann's critique, Redis founder's response. The great distributed lock debate.", src: "Martin Kleppmann / Antirez", time: "30 min" },
{ tag: "database", title: "Query Optimizer — How Databases Choose Plans", desc: "Cost-based optimization, cardinality estimation, join ordering, statistics. Why EXPLAIN lies sometimes.", src: "CMU Database Course", time: "25 min" },
{ tag: "distributed", title: "The Log — What Every Engineer Should Know", desc: "Append-only logs as universal data structure. Kafka, WAL, event sourcing, replication — all are logs.", src: "Jay Kreps", time: "30 min" }]);
DAILY_READINGS.push([{ tag: "performance", title: "Java Virtual Threads — Project Loom", desc: "Lightweight threads, 1M concurrent tasks, structured concurrency. Replacing reactive programming.", src: "OpenJDK", time: "25 min" },
{ tag: "architecture", title: "GitOps — Infrastructure via Pull Requests", desc: "ArgoCD, Flux. Declarative infrastructure, drift detection, automated reconciliation. Git as source of truth.", src: "Weaveworks", time: "20 min" },
{ tag: "cloud", title: "AWS Bedrock — Enterprise AI Infrastructure", desc: "Foundation models (Claude, Titan), RAG with Knowledge Bases, guardrails, fine-tuning. AI platform.", src: "AWS ML Blog", time: "25 min" }]);
DAILY_READINGS.push([{ tag: "kafka", title: "Event Mesh — Connecting Event Brokers", desc: "Solace, AsyncAPI, event portal. Multi-protocol event routing across cloud, on-prem, and edge.", src: "Solace Blog", time: "20 min" },
{ tag: "database", title: "Distributed Joins — The Hard Problem", desc: "Hash join, broadcast join, shuffle join. Network overhead, data skew, bloom filter optimization.", src: "Spark SQL Docs", time: "25 min" },
{ tag: "distributed", title: "Metastable Failures — When Systems Get Stuck", desc: "Retries causing more retries, GC pauses triggering timeouts. Self-reinforcing failure modes.", src: "OSDI Paper", time: "25 min" }]);
DAILY_READINGS.push([{ tag: "redis", title: "Redis on Flash — Cost-Effective Large Datasets", desc: "Hot data on RAM, warm data on NVMe. 10x cost savings for large key spaces. Redis Enterprise Flash.", src: "Redis Labs", time: "20 min" },
{ tag: "cloud", title: "Platform Engineering Maturity Model", desc: "From scripts → internal tools → self-service platform. Measuring developer productivity gains.", src: "CNCF Blog", time: "25 min" },
{ tag: "performance", title: "Flamegraph Analysis — Finding the Real Bottleneck", desc: "CPU, allocation, wall-clock flame graphs. Reading flame graphs, differential flame graphs.", src: "Brendan Gregg", time: "20 min" }]);
DAILY_READINGS.push([{ tag: "architecture", title: "System Design Interview Framework — The 45-Minute Plan", desc: "Requirements (5m) → Estimation (5m) → API (5m) → Schema (5m) → Architecture (15m) → Deep Dive (10m).", src: "Alex Xu", time: "25 min" },
{ tag: "kafka", title: "Kafka Internals — Log Segment Management", desc: "Segment rolling, log cleanup, retention bytes vs time, min.compaction.lag. Storage internals.", src: "Confluent", time: "20 min" },
{ tag: "database", title: "Database as Queue — Anti-Pattern or Not?", desc: "SELECT FOR UPDATE SKIP LOCKED, advisory locks for job queues. When DB-as-queue actually works.", src: "PostgreSQL Wiki", time: "20 min" }]);
DAILY_READINGS.push([{ tag: "distributed", title: "Paxos vs Raft vs PBFT — Consensus Comparison", desc: "Crash tolerance (Paxos/Raft) vs Byzantine tolerance (PBFT). Performance, complexity, use cases.", src: "Consensus Survey", time: "25 min" },
{ tag: "redis", title: "Redis Monitoring — INFO Command Deep Dive", desc: "Memory usage, connected clients, keyspace hits/misses, replication lag. The 10 metrics that matter.", src: "Redis.io", time: "15 min" },
{ tag: "cloud", title: "AWS Well-Architected Review — How to Do It", desc: "Step-by-step review against 6 pillars. Identifying risks, prioritizing remediations, building roadmap.", src: "AWS Framework", time: "25 min" }]);
DAILY_READINGS.push([{ tag: "performance", title: "Encoding Efficiency — Protobuf vs Avro vs MessagePack", desc: "Schema evolution, backwards compatibility, size comparison, parsing speed. Choosing the right format.", src: "Martin Kleppmann", time: "20 min" },
{ tag: "architecture", title: "Building Reliable Cron at Scale", desc: "Distributed job scheduling, exactly-once execution, missed scheduler detection. Airflow vs custom.", src: "Airbnb Tech Blog", time: "25 min" },
{ tag: "database", title: "Online Schema Migration — Zero-Downtime DDL", desc: "gh-ost, pt-online-schema-change, pg_repack. Altering billion-row tables without locking.", src: "GitHub Engineering", time: "25 min" }]);
DAILY_READINGS.push([{ tag: "kafka", title: "Kafka at Uber — Trip Processing Pipeline", desc: "1T+ messages/day, multi-region, uReplicator, dead letter queue patterns. Uber's Kafka architecture.", src: "Uber Engineering", time: "25 min" },
{ tag: "distributed", title: "Coordination Avoidance — CALM Theorem", desc: "Consistency As Logical Monotonicity. When you don't need coordination (and can scale linearly).", src: "UC Berkeley Research", time: "25 min" },
{ tag: "cloud", title: "Cloud-Native Security — OWASP Top 10 for K8s", desc: "Container escape, secrets in env vars, RBAC misconfiguration, network policies. Security checklist.", src: "OWASP", time: "25 min" }]);
DAILY_READINGS.push([{ tag: "redis", title: "Redis Architecture Decision Guide", desc: "Standalone vs Sentinel vs Cluster. Data persistence strategy. Key eviction policy. Complete decision tree.", src: "Redis.io", time: "25 min" },
{ tag: "database", title: "The Future of Databases — Serverless & Edge", desc: "Neon (serverless Postgres), PlanetScale (serverless MySQL), D1 (edge SQLite). Where databases are heading.", src: "Database Trends", time: "25 min" },
{ tag: "performance", title: "System Design Numbers — Quick Reference", desc: "QPS per server, storage per user, bandwidth estimation. The cheat sheet for back-of-envelope.", src: "System Design Primer", time: "15 min" }]);
DAILY_READINGS.push([{ tag: "architecture", title: "Your Career at 50+ LPA — The Complete Playbook", desc: "T-shaped skills, system design ownership, production thinking, business impact. What 0.1% engineers do differently.", src: "Staff Engineering Path", time: "30 min" },
{ tag: "kafka", title: "Kafka Ecosystem Summary — All Components", desc: "Broker, Connect, Streams, ksqlDB, Schema Registry, REST Proxy, MirrorMaker. Complete ecosystem map.", src: "Confluent Docs", time: "20 min" },
{ tag: "distributed", title: "Designing Data-Intensive Applications — Key Takeaways", desc: "The 10 most important concepts from DDIA. Replication, partitioning, transactions, stream processing.", src: "Martin Kleppmann", time: "30 min" }]);
// Day 87
DAILY_READINGS.push([{tag:"database",title:"PostgreSQL Extensions — pgvector, pg_cron, PostGIS",desc:"Vector similarity search, scheduled jobs, geospatial queries. Extending PostgreSQL for modern workloads.",src:"PostgreSQL Wiki",time:"25 min"},
{tag:"cloud",title:"AWS Network Load Balancer vs Application LB",desc:"Layer 4 vs Layer 7, TCP passthrough, static IPs, TLS termination. When NLB outperforms ALB.",src:"AWS Networking Blog",time:"20 min"},
{tag:"architecture",title:"Monorepo vs Polyrepo — Engineering Trade-offs",desc:"Nx, Turborepo, Bazel. Code sharing, version management, CI/CD complexity. Google vs Netflix approach.",src:"Nrwl Blog",time:"20 min"}]);
// Day 88
DAILY_READINGS.push([{tag:"kafka",title:"Kafka KRaft Mode — ZooKeeper-Free Architecture",desc:"Built-in Raft consensus replacing ZooKeeper. Metadata quorum, controller nodes. The future of Kafka.",src:"Confluent Blog",time:"25 min"},
{tag:"redis",title:"Redis vs Memcached — The Definitive Comparison",desc:"Data structures, persistence, clustering, memory efficiency. When each wins. Side-by-side benchmarks.",src:"Redis Labs",time:"20 min"},
{tag:"distributed",title:"Serverless Cold Start Deep Dive",desc:"JVM vs GraalVM native image vs Go vs Rust. Warm pool strategies, SnapStart, provisioned concurrency.",src:"AWS Lambda Blog",time:"25 min"}]);
// Day 89
DAILY_READINGS.push([{tag:"performance",title:"Database Read Replicas — Lag, Routing, Consistency",desc:"Sync vs async replication lag, read-after-write consistency, smart routing. Scaling reads to 100x.",src:"AWS Database Blog",time:"20 min"},
{tag:"architecture",title:"Technical Debt — Quantifying and Prioritizing",desc:"Code-level vs architecture-level debt. Interest rate metaphor. When to pay down vs when to ship.",src:"Martin Fowler",time:"20 min"},
{tag:"distributed",title:"Service Level Objectives (SLOs) — The SRE Way",desc:"SLI, SLO, SLA, error budgets. Measuring reliability, alerting on burn rate. Google SRE practices.",src:"Google SRE Book",time:"25 min"}]);
// Day 90
DAILY_READINGS.push([{tag:"kafka",title:"The Complete Kafka Playbook — 90-Day Retrospective",desc:"Everything you learned: internals, patterns, tuning, operations. Your Kafka mastery summary.",src:"Self-Review",time:"30 min"},
{tag:"database",title:"Database Engineering Career Path — What's Next",desc:"From indexing to query optimization to distributed SQL. Building the skills that command 50+ LPA.",src:"Career Roadmap",time:"20 min"},
{tag:"architecture",title:"System Design Ownership — Your 0.1% Playbook",desc:"Own the design, own the trade-offs, own the production behavior. The mindset that changes everything.",src:"Staff+ Engineering",time:"30 min"}]);
