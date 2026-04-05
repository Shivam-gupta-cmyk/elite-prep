// ═══ 90-Day Deep Dive Readings — ALL UNIQUE, NO REPEATS ═══
const DAILY_READINGS = [
// Day 1
[{tag:"database",title:"How Does a Database Index Work?",desc:"B-Tree vs LSM-Tree indexing, query plans, composite indexes. Foundation of all DB performance.",src:"Use The Index, Luke",time:"20 min"},
{tag:"architecture",title:"The Twelve-Factor App",desc:"Methodology for building SaaS apps: config, dependencies, backing services, logs, processes.",src:"12factor.net",time:"25 min"},
{tag:"distributed",title:"CAP Theorem Explained",desc:"Consistency, Availability, Partition tolerance. The fundamental trade-off all distributed systems face.",src:"Martin Kleppmann",time:"15 min"}],
// Day 2
[{tag:"kafka",title:"Kafka 101 — Why Message Queues Exist",desc:"Producer-Consumer model, topics, partitions, consumer groups. Why Kafka changed backend engineering.",src:"Confluent Blog",time:"20 min"},
{tag:"redis",title:"Redis Data Structures Deep Dive",desc:"Strings, Lists, Sets, Sorted Sets, Hashes, HyperLogLog, Streams. When to use which and why.",src:"Redis.io Docs",time:"25 min"},
{tag:"cloud",title:"AWS Core Services Map",desc:"EC2, S3, RDS, Lambda, SQS, SNS, DynamoDB, CloudFront — the 8 services covering 80% use cases.",src:"AWS Well-Architected",time:"20 min"}],
// Day 3
[{tag:"database",title:"PostgreSQL MVCC Internals",desc:"Multi-Version Concurrency Control: how Postgres handles concurrent reads/writes without locking.",src:"PostgreSQL Docs",time:"25 min"},
{tag:"distributed",title:"Consistent Hashing — The Key to Scaling",desc:"How DynamoDB, Cassandra, Discord distribute data. Virtual nodes, rebalancing strategies.",src:"System Design Primer",time:"15 min"},
{tag:"performance",title:"Latency Numbers Every Engineer Must Know",desc:"L1 cache (1ns) → RAM (100ns) → SSD (100μs) → disk (10ms) → cross-continent (150ms).",src:"Jeff Dean, Google",time:"10 min"}],
// Day 4
[{tag:"kafka",title:"Kafka Partitioning Strategy",desc:"Key-based partitioning, consumer groups, rebalancing protocols, sticky assignor.",src:"Confluent Blog",time:"25 min"},
{tag:"cloud",title:"AWS VPC, Security Groups & IAM",desc:"VPC design, subnets (public/private), NACLs, security groups, IAM policies/roles.",src:"AWS Docs",time:"25 min"},
{tag:"architecture",title:"CQRS — Separate Reads from Writes",desc:"Command Query Responsibility Segregation. When to split read/write models and why.",src:"Martin Fowler",time:"20 min"}],
// Day 5
[{tag:"redis",title:"Redis Caching Patterns — Eviction Policies",desc:"LRU, LFU, volatile-ttl, allkeys-random. Cache-aside, write-through, write-behind patterns.",src:"Redis University",time:"20 min"},
{tag:"database",title:"Database Sharding Strategies",desc:"Range, Hash, Directory-based, Geo sharding. Cross-shard queries, rebalancing, consistent hashing.",src:"Vitess.io",time:"25 min"},
{tag:"distributed",title:"Raft Consensus Made Simple",desc:"Leader election, log replication, safety guarantees. The algorithm behind etcd, TiKV, CockroachDB.",src:"The Raft Paper",time:"30 min"}],
// Day 6
[{tag:"kafka",title:"Kafka Connect & Schema Registry",desc:"Source/Sink connectors for DB-to-Kafka sync. Schema evolution with Avro, Protobuf, JSON Schema.",src:"Confluent Docs",time:"25 min"},
{tag:"cloud",title:"AWS Lambda — Serverless Deep Dive",desc:"Cold starts, provisioned concurrency, event sources, memory/timeout tuning. When NOT to use Lambda.",src:"AWS Compute Blog",time:"20 min"},
{tag:"performance",title:"How Netflix Optimizes Backend Performance",desc:"Zuul edge proxy, Hystrix circuit breaker, EVCache caching, async non-blocking I/O with RxJava.",src:"Netflix Tech Blog",time:"25 min"}],
// Day 7
[{tag:"database",title:"Write-Ahead Logging — Crash Recovery",desc:"WAL protocol: log before data. Checkpointing, ARIES recovery algorithm. How databases survive crashes.",src:"CMU Database Course",time:"20 min"},
{tag:"redis",title:"Redis Cluster — Sharding & Replication",desc:"Hash slots (16384), master-replica replication, automatic failover, cluster bus protocol.",src:"Redis.io",time:"25 min"},
{tag:"distributed",title:"Gossip Protocol — Epidemic Communication",desc:"How nodes share state without central coordination. Used by Cassandra, Consul, SWIM, DynamoDB.",src:"Distributed Systems",time:"15 min"}],
// Day 8
[{tag:"kafka",title:"Kafka Streams — Stateful Processing",desc:"KStreams, KTables, joins, windowing (tumbling/sliding/session), interactive queries.",src:"Confluent Blog",time:"30 min"},
{tag:"cloud",title:"AWS SQS vs SNS vs EventBridge",desc:"Point-to-point vs pub-sub vs event bus. Fan-out patterns, FIFO queues, dead-letter queues.",src:"AWS Docs",time:"20 min"},
{tag:"architecture",title:"Event-Driven Architecture Patterns",desc:"Event notification, event-carried state transfer, event sourcing. Choreography vs orchestration.",src:"Martin Fowler",time:"25 min"}],
// Day 9
[{tag:"database",title:"DynamoDB — Single Table Design",desc:"Partition keys, sort keys, GSI/LSI overloading. Access patterns first, schema second. The NoSQL way.",src:"Alex DeBrie",time:"30 min"},
{tag:"distributed",title:"Vector Clocks & Conflict Resolution",desc:"Detecting concurrent writes in distributed systems. Happens-before, version vectors, last-writer-wins.",src:"Amazon Dynamo Paper",time:"25 min"},
{tag:"performance",title:"Connection Pooling — HikariCP Deep Dive",desc:"Pool sizing formula (connections = cores × 2 + disk_spindles). Dead connection detection, leak tracing.",src:"HikariCP Wiki",time:"15 min"}],
// Day 10
[{tag:"redis",title:"Redis Pub/Sub vs Streams",desc:"Pub/Sub: fire-and-forget, fan-out. Streams: persistent log with consumer groups, ACK, PENDING.",src:"Redis University",time:"20 min"},
{tag:"cloud",title:"AWS Container Strategy: ECS vs EKS vs Fargate",desc:"When to use each. Cost, complexity, scaling trade-offs. Fargate for serverless containers.",src:"AWS Containers Blog",time:"20 min"},
{tag:"architecture",title:"Microservices Anti-Patterns",desc:"Distributed monolith, shared DB, synchronous chains, nano-services. How NOT to do microservices.",src:"Sam Newman",time:"25 min"}],
// Day 11
[{tag:"kafka",title:"Kafka Exactly-Once Semantics",desc:"Idempotent producers (enable.idempotence), transactional messaging, consumer offset commits.",src:"Confluent Blog",time:"25 min"},
{tag:"database",title:"PostgreSQL Query Optimization",desc:"EXPLAIN ANALYZE, seq scan vs index scan, B-Tree/GIN/GiST indexes, query planner cost model.",src:"PgAnalyze Blog",time:"25 min"},
{tag:"distributed",title:"Circuit Breaker Pattern",desc:"Open → half-open → closed states. Resilience4j implementation. Fail-fast to protect cascading failures.",src:"Martin Fowler",time:"15 min"}],
// Day 12
[{tag:"redis",title:"Redis Lua Scripting — Atomic Operations",desc:"EVAL/EVALSHA for atomic multi-step ops. Building rate limiters, leaderboards, distributed locks.",src:"Redis.io",time:"20 min"},
{tag:"cloud",title:"AWS RDS vs Aurora Architecture",desc:"Shared storage architecture, 6-way replication, read replicas, global databases. 5x Postgres throughput.",src:"AWS Database Blog",time:"25 min"},
{tag:"architecture",title:"Domain-Driven Design in Practice",desc:"Bounded contexts, aggregates, domain events, anti-corruption layer. DDD for microservice boundaries.",src:"Vaughn Vernon",time:"30 min"}],
// Day 13
[{tag:"database",title:"Elasticsearch — Inverted Index Internals",desc:"Tokenization, inverted index, TF-IDF, BM25 scoring. How search engines rank results.",src:"Elastic Blog",time:"25 min"},
{tag:"distributed",title:"Bloom Filters — Probabilistic Membership",desc:"Space-efficient probabilistic DS. False positives, no false negatives. Used by BigTable, Chrome, Medium.",src:"System Design",time:"15 min"},
{tag:"cloud",title:"Kubernetes Control Plane Deep Dive",desc:"API server, etcd, scheduler, controller manager, kubelet. How K8s makes scheduling decisions.",src:"K8s Docs",time:"30 min"}],
// Day 14
[{tag:"kafka",title:"Kafka Consumer Lag — Monitoring & Alerting",desc:"What lag means, why it matters. Burrow, Lag Exporter, consumer group describe. Alert thresholds.",src:"Confluent Blog",time:"20 min"},
{tag:"redis",title:"Redis Sentinel — High Availability",desc:"Automatic failover, leader election among Sentinels, quorum concept, split-brain protection.",src:"Redis.io",time:"20 min"},
{tag:"architecture",title:"API Design — REST vs gRPC vs GraphQL",desc:"REST constraints, gRPC for internal services, GraphQL for flexible clients. Versioning strategies.",src:"Google Cloud Blog",time:"25 min"}],
// Day 15
[{tag:"database",title:"Database Connection Management at Scale",desc:"Pgbouncer (transaction pooling), ProxySQL. Serving 100K users with 100 DB connections.",src:"PostgreSQL Wiki",time:"20 min"},
{tag:"distributed",title:"Leader Election Algorithms",desc:"Bully algorithm, ring-based election, ZooKeeper recipes. How distributed systems choose a leader.",src:"Distributed Systems",time:"20 min"},
{tag:"cloud",title:"AWS CloudFront + S3 — CDN Architecture",desc:"Edge locations, origin shield, cache behaviors, invalidation, Lambda@Edge for dynamic content.",src:"AWS Docs",time:"20 min"}],
// Day 16
[{tag:"kafka",title:"Kafka Log Compaction",desc:"Keep latest value per key forever. Use cases: CDC changelog, materialized views, event sourcing state.",src:"Confluent",time:"20 min"},
{tag:"database",title:"Understanding Database Isolation Levels",desc:"READ UNCOMMITTED → READ COMMITTED → REPEATABLE READ → SERIALIZABLE. Phantom reads, write skew.",src:"CMU DB Course",time:"25 min"},
{tag:"cloud",title:"AWS Step Functions — Workflow Orchestration",desc:"State machines for complex workflows. Standard vs Express. Retry policies, error handling, parallel.",src:"AWS Blog",time:"20 min"}],
// Day 17
[{tag:"redis",title:"Redis Modules — Extending Beyond Key-Value",desc:"RedisJSON (document store), RediSearch (full-text), RedisGraph (Cypher queries), RedisTimeSeries.",src:"Redis Labs",time:"20 min"},
{tag:"distributed",title:"The Google File System Paper",desc:"GFS architecture: master, chunkservers, 64MB chunks. Replication, consistency model. Foundation of HDFS.",src:"Google Research",time:"30 min"},
{tag:"architecture",title:"Strangler Fig Pattern",desc:"Incrementally migrate monolith to microservices. Route traffic to new service, keep old alive.",src:"Martin Fowler",time:"15 min"}],
// Day 18
[{tag:"performance",title:"JVM Profiling — Flight Recorder & Flame Graphs",desc:"async-profiler, JFR continuous profiling, CPU/allocation flame graphs. Finding the real bottleneck.",src:"Oracle Docs",time:"25 min"},
{tag:"kafka",title:"CDC with Debezium + Kafka Connect",desc:"Change Data Capture: stream DB changes (INSERT/UPDATE/DELETE) to Kafka in real-time. Outbox pattern.",src:"Debezium.io",time:"25 min"},
{tag:"cloud",title:"GCP Spanner — Globally Distributed SQL",desc:"TrueTime API, external consistency with atomic clocks. How Spanner provides CP with high availability.",src:"Google Cloud",time:"30 min"}],
// Day 19
[{tag:"redis",title:"Redis Rate Limiting Algorithms",desc:"Token bucket, sliding window log, sliding window counter, fixed window. Lua scripts for atomicity.",src:"Redis University",time:"20 min"},
{tag:"database",title:"Time-Series Databases — Design & Trade-offs",desc:"InfluxDB vs TimescaleDB vs Prometheus. Write-optimized storage, downsampling, retention policies.",src:"TimescaleDB Blog",time:"20 min"},
{tag:"distributed",title:"MapReduce to Spark — Batch Processing Evolution",desc:"MapReduce paradigm, shuffle bottleneck. Spark in-memory DAG, lazy evaluation, catalyst optimizer.",src:"Spark Docs",time:"25 min"}],
// Day 20
[{tag:"architecture",title:"Feature Flags — Progressive Delivery",desc:"Trunk-based dev, percentage rollouts, canary releases, kill switches. LaunchDarkly architecture.",src:"Martin Fowler",time:"15 min"},
{tag:"performance",title:"Linux Performance Tuning for Backend Devs",desc:"TCP_NODELAY, SO_REUSEPORT, file descriptor limits, epoll vs io_uring. Kernel params that matter.",src:"Brendan Gregg",time:"25 min"},
{tag:"kafka",title:"Kafka Multi-Datacenter Replication",desc:"MirrorMaker 2, active-passive vs active-active. Offset translation, topic renaming, disaster recovery.",src:"Confluent",time:"25 min"}],
// Day 21
[{tag:"redis",title:"Redis Persistence — RDB vs AOF",desc:"RDB snapshots (point-in-time), AOF append-only log. Hybrid mode. Recovery speed vs data safety.",src:"Redis.io",time:"20 min"},
{tag:"database",title:"CockroachDB — Distributed SQL Internals",desc:"Serializable isolation on Raft consensus. Range splitting, leaseholder optimization, geo-partitioning.",src:"Cockroach Labs",time:"25 min"},
{tag:"cloud",title:"Terraform — Infrastructure as Code at Scale",desc:"State management, remote backends, modules, workspaces. Managing 1000+ resources across accounts.",src:"HashiCorp Learn",time:"25 min"}],
// Day 22
[{tag:"distributed",title:"Paxos Made Simple",desc:"Lamport's consensus algorithm. Proposers, acceptors, learners. Multi-Paxos for replicated state machines.",src:"Lamport Paper",time:"30 min"},
{tag:"architecture",title:"Zero-Trust Architecture",desc:"Never trust, always verify. Service mesh mTLS, SPIFFE/SPIRE identity, beyond perimeter security.",src:"NIST SP 800-207",time:"20 min"},
{tag:"performance",title:"The Art of Database Indexing",desc:"Covering indexes, partial indexes, expression indexes, BRIN indexes. When NOT to add an index.",src:"Use The Index Luke",time:"20 min"}],
// Day 23
[{tag:"kafka",title:"Building Event-Driven Systems with Kafka",desc:"Saga orchestration, outbox pattern, idempotent consumers, dead letter topics. Production patterns.",src:"Confluent",time:"25 min"},
{tag:"redis",title:"Redis Streams — Kafka-like Semantics",desc:"XADD, XREAD, XREADGROUP, XACK. Consumer groups with at-least-once delivery. Trimming strategies.",src:"Redis.io",time:"25 min"},
{tag:"cloud",title:"AWS EKS Production Setup",desc:"HPA, VPA, Cluster Autoscaler, Karpenter. Istio service mesh, canary deployments with Flagger.",src:"AWS EKS Workshop",time:"30 min"}],
// Day 24
[{tag:"database",title:"Graph Databases — Neo4j Internals",desc:"Native graph storage, index-free adjacency. Cypher query language. Social networks, fraud detection.",src:"Neo4j Docs",time:"20 min"},
{tag:"distributed",title:"Amazon Dynamo Paper",desc:"Eventual consistency, sloppy quorum, hinted handoff, merkle trees, vector clocks. The original NoSQL.",src:"Amazon Research",time:"30 min"},
{tag:"architecture",title:"Observability — The Three Pillars",desc:"Structured logs (ELK), metrics (Prometheus/Grafana), distributed traces (Jaeger/OpenTelemetry).",src:"Google SRE Book",time:"25 min"}],
// Day 25
[{tag:"performance",title:"Load Balancing Algorithms Deep Dive",desc:"Round robin, least connections, weighted, consistent hash, P2C (power of two choices), EWMA.",src:"NGINX Blog",time:"20 min"},
{tag:"kafka",title:"Kafka Performance Tuning — Producer Config",desc:"batch.size, linger.ms, compression.type, acks, buffer.memory. Tuning for throughput vs latency.",src:"Confluent Blog",time:"20 min"},
{tag:"redis",title:"Redis Memory Optimization Techniques",desc:"ziplist/listpack encoding, jemalloc tuning, key expiry strategies. Storing 1B keys in 100GB RAM.",src:"Redis.io",time:"20 min"}],
// Day 26
[{tag:"database",title:"MySQL InnoDB Architecture",desc:"Buffer pool, change buffer, adaptive hash index, doublewrite buffer. How InnoDB achieves ACID.",src:"MySQL Docs",time:"25 min"},
{tag:"cloud",title:"AWS DynamoDB Advanced Patterns",desc:"Adjacency list pattern, write sharding, sparse indexes, DynamoDB transactions, DAX caching.",src:"Alex DeBrie",time:"25 min"},
{tag:"distributed",title:"Zookeeper — Coordination Service Internals",desc:"ZAB protocol, ephemeral nodes, watches, leader election recipes. Foundation of Kafka, HBase.",src:"Apache ZooKeeper",time:"25 min"}],
// Day 27
[{tag:"architecture",title:"Saga Pattern — Distributed Transactions",desc:"Choreography vs orchestration sagas. Compensating transactions, failure handling, idempotency.",src:"Chris Richardson",time:"25 min"},
{tag:"performance",title:"HTTP/2 and HTTP/3 — What Changed",desc:"Multiplexing, header compression, server push (h2). QUIC protocol, 0-RTT handshake (h3).",src:"Cloudflare Blog",time:"20 min"},
{tag:"kafka",title:"Kafka Consumer Tuning — Rebalancing",desc:"Static membership, cooperative rebalancing, max.poll.interval, session.timeout. Reducing rebalance storms.",src:"Confluent Blog",time:"20 min"}],
// Day 28
[{tag:"redis",title:"Redis Geospatial — Location-Based Services",desc:"GEOADD, GEODIST, GEORADIUS. Building ride-hailing, food delivery, store finder features.",src:"Redis.io",time:"15 min"},
{tag:"database",title:"Vitess — Scaling MySQL Horizontally",desc:"Connection pooling, query routing, resharding online. How YouTube scaled MySQL to internet scale.",src:"Vitess.io",time:"25 min"},
{tag:"cloud",title:"AWS Kinesis vs Kafka — When to Use Which",desc:"Kinesis Data Streams, Firehose, Analytics. Managed vs self-hosted trade-offs. Cost comparison.",src:"AWS Blog",time:"20 min"}],
// Day 29
[{tag:"distributed",title:"Cracking the Scalability Code — Instagram's Stack",desc:"Django + PostgreSQL + Redis + Memcached + RabbitMQ. How Instagram served 1B users.",src:"Instagram Tech Blog",time:"25 min"},
{tag:"architecture",title:"Hexagonal Architecture (Ports & Adapters)",desc:"Decouple business logic from infrastructure. Primary/secondary ports, driven/driving adapters.",src:"Alistair Cockburn",time:"20 min"},
{tag:"performance",title:"Database Vacuum — PostgreSQL Maintenance",desc:"Dead tuples, autovacuum tuning, bloat detection. Why PostgreSQL needs regular maintenance.",src:"PgAnalyze",time:"20 min"}],
// Day 30
[{tag:"kafka",title:"Kafka Security — Authentication & Authorization",desc:"SASL/SCRAM, mTLS, ACLs, RBAC. Encrypting data in transit and at rest. Multi-tenant Kafka.",src:"Confluent",time:"20 min"},
{tag:"redis",title:"Redis Transactions vs Lua vs Modules",desc:"MULTI/EXEC pipelines, Lua atomicity, Redis Functions. Choosing the right approach for consistency.",src:"Redis University",time:"20 min"},
{tag:"cloud",title:"AWS Well-Architected Framework — 6 Pillars",desc:"Security, Reliability, Performance, Cost, Operational Excellence, Sustainability. Review checklist.",src:"AWS Docs",time:"30 min"}],
// Day 31
[{tag:"database",title:"LSM-Tree — The Engine Behind RocksDB",desc:"Memtable, SSTable, compaction strategies (leveled/tiered). Write-optimized storage for Cassandra, CockroachDB.",src:"RocksDB Wiki",time:"25 min"},
{tag:"distributed",title:"Consistent Core Pattern",desc:"A small consistent core (3-5 nodes Raft) managing metadata while data nodes scale horizontally.",src:"Patterns of Distributed Systems",time:"20 min"},
{tag:"architecture",title:"Clean Architecture — Dependency Rule",desc:"Entities → Use Cases → Interface Adapters → Frameworks. Dependencies point inward only.",src:"Robert C. Martin",time:"25 min"}],
// Day 32
[{tag:"kafka",title:"ksqlDB — Streaming SQL on Kafka",desc:"CREATE STREAM, CREATE TABLE, JOIN, WINDOW. Build materialized views with plain SQL on Kafka topics.",src:"Confluent Docs",time:"25 min"},
{tag:"cloud",title:"GCP BigQuery Architecture",desc:"Dremel engine, columnar storage, Capacitor format. How BigQuery scans petabytes in seconds.",src:"Google Cloud",time:"25 min"},
{tag:"performance",title:"GC Tuning — G1 vs ZGC vs Shenandoah",desc:"Pause time goals, region-based collection, concurrent marking. When to switch garbage collectors.",src:"Oracle GC Tuning Guide",time:"25 min"}],
// Day 33
[{tag:"redis",title:"Redis Probabilistic Data Structures",desc:"HyperLogLog (cardinality), Bloom Filter (membership), Count-Min Sketch (frequency), Top-K.",src:"Redis.io",time:"20 min"},
{tag:"database",title:"PostgreSQL Partitioning — Range, List, Hash",desc:"Table partitioning for billion-row tables. Partition pruning, FK constraints, maintenance strategies.",src:"PostgreSQL Docs",time:"25 min"},
{tag:"distributed",title:"Two-Phase Commit — Why It's Hard",desc:"Prepare + commit phases, blocking problem, coordinator failure. Why modern systems prefer Saga.",src:"Distributed Systems",time:"20 min"}],
// Day 34
[{tag:"architecture",title:"Backend for Frontend (BFF) Pattern",desc:"Dedicated backends per client (web, mobile, TV). Avoiding God API gateway. Netflix's approach.",src:"Sam Newman",time:"20 min"},
{tag:"kafka",title:"Kafka Tiered Storage — Infinite Retention",desc:"Separate hot (local) from cold (S3) storage. Cost-effective infinite retention without disk limits.",src:"Confluent Blog",time:"20 min"},
{tag:"cloud",title:"AWS ElastiCache — Redis vs Memcached",desc:"Cluster mode, data tiering, read replicas, multi-AZ. When to choose ElastiCache over self-hosted.",src:"AWS Database Blog",time:"20 min"}],
// Day 35
[{tag:"database",title:"ClickHouse — OLAP Database Internals",desc:"MergeTree engine, columnar storage, vectorized execution. How ClickHouse achieves 1B rows/sec scans.",src:"ClickHouse Docs",time:"25 min"},
{tag:"distributed",title:"SWIM Protocol — Scalable Failure Detection",desc:"Infection-style dissemination + failure detection. Sub-second detection in 1000+ node clusters.",src:"SWIM Paper",time:"20 min"},
{tag:"performance",title:"Thread Pool Sizing — Right Number of Threads",desc:"CPU-bound: cores+1. IO-bound: cores × (1 + wait/compute). Little's Law for queue sizing.",src:"Brian Goetz",time:"15 min"}],
// Day 36
[{tag:"redis",title:"Redis as a Message Broker — Beyond Cache",desc:"Task queues with BRPOPLPUSH, delayed jobs with sorted sets, event bus with Pub/Sub. Redis-backed Sidekiq.",src:"Redis.io",time:"20 min"},
{tag:"cloud",title:"Cloudflare Workers — Edge Computing",desc:"V8 isolates (not containers), 0ms cold starts, 200+ PoPs. When edge computing beats traditional cloud.",src:"Cloudflare Blog",time:"20 min"},
{tag:"architecture",title:"API Gateway Pattern — Kong, Ambassador, Envoy",desc:"Rate limiting, authentication, routing, transformation, circuit breaking at the edge. Gateway vs mesh.",src:"microservices.io",time:"25 min"}],
// Day 37
[{tag:"kafka",title:"Kafka Headers & Dead Letter Topics",desc:"Message metadata, error handling patterns, retry topics, DLQ design. Production error handling.",src:"Confluent Blog",time:"20 min"},
{tag:"database",title:"TiDB — Distributed NewSQL Architecture",desc:"MySQL-compatible, horizontal scaling with TiKV (Raft), TiFlash (columnar OLAP). HTAP workloads.",src:"PingCAP Docs",time:"25 min"},
{tag:"distributed",title:"Merkle Trees — Data Integrity Verification",desc:"How Git, BitTorrent, DynamoDB, Cassandra verify data consistency with hash trees.",src:"Distributed Systems",time:"15 min"}],
// Day 38
[{tag:"performance",title:"CDN Architecture — How Akamai/CloudFront Work",desc:"DNS-based routing, anycast, edge caching, origin shield. Cache hierarchy, invalidation strategies.",src:"Akamai Tech",time:"25 min"},
{tag:"redis",title:"Redis Cluster Migration — Zero Downtime",desc:"MIGRATE, CLUSTER SETSLOT, resharding. Rolling upgrades, slot migration without data loss.",src:"Redis.io",time:"20 min"},
{tag:"cloud",title:"AWS SNS + SQS Fan-Out Architecture",desc:"Topic-to-queue fan-out, message filtering policies, FIFO topics. Decoupling microservices.",src:"AWS Docs",time:"20 min"}],
// Day 39
[{tag:"database",title:"ScyllaDB — C++ Cassandra Alternative",desc:"Shard-per-core architecture, seastar framework, no JVM GC pauses. 10x Cassandra performance.",src:"ScyllaDB Blog",time:"20 min"},
{tag:"architecture",title:"Event Storming — Discovering Domain Events",desc:"Collaborative modeling workshop. Domain events → commands → aggregates → bounded contexts.",src:"Alberto Brandolini",time:"25 min"},
{tag:"distributed",title:"Lamport Clocks & Logical Time",desc:"Happened-before relation, logical timestamps, total ordering of events. Foundation of distributed time.",src:"Lamport Paper",time:"20 min"}],
// Day 40
[{tag:"kafka",title:"Kafka Schema Evolution Best Practices",desc:"Backward/forward/full compatibility. Avro vs Protobuf vs JSON Schema. Breaking change prevention.",src:"Confluent Docs",time:"20 min"},
{tag:"cloud",title:"AWS IAM Deep Dive — Least Privilege",desc:"Policy evaluation logic, permission boundaries, service control policies (SCPs), cross-account roles.",src:"AWS Security Blog",time:"25 min"},
{tag:"performance",title:"gRPC Performance — Protobuf vs JSON",desc:"Binary serialization (10x faster), HTTP/2 multiplexing, bidirectional streaming. Benchmark results.",src:"gRPC.io",time:"20 min"}],
// Day 41
[{tag:"redis",title:"Redis Keyspace Notifications — Event-Driven",desc:"Subscribe to key expirations, modifications, deletions. Building cache invalidation, session timeout alerts.",src:"Redis.io",time:"15 min"},
{tag:"database",title:"NewSQL Movement — Spanner vs CockroachDB vs TiDB",desc:"Comparing distributed SQL databases: consistency models, deployment, SQL compatibility, performance.",src:"Database Comparison",time:"25 min"},
{tag:"distributed",title:"Sidecar Pattern — Service Mesh Foundation",desc:"Co-located proxy handling networking. Envoy sidecar: retries, circuit breaking, mTLS, observability.",src:"Istio Docs",time:"20 min"}],
// Day 42
[{tag:"architecture",title:"Idempotency in Distributed Systems",desc:"Idempotency keys, deduplication strategies, exactly-once processing. Stripe's approach to payment safety.",src:"Stripe Engineering",time:"25 min"},
{tag:"kafka",title:"Kafka on Kubernetes — Strimzi Operator",desc:"StatefulSets, persistent volumes, rack awareness, rolling updates. Running Kafka cloud-natively.",src:"Strimzi Docs",time:"25 min"},
{tag:"cloud",title:"AWS Aurora Serverless v2",desc:"Instant scaling (0.5 to 128 ACUs), per-second billing, mixed workloads. When serverless DB makes sense.",src:"AWS Database Blog",time:"20 min"}],
// Day 43
[{tag:"database",title:"PostgreSQL JSONB — Document Store Inside SQL",desc:"JSONB indexing (GIN), containment operators, jsonpath queries. When to use JSONB vs separate tables.",src:"PostgreSQL Docs",time:"20 min"},
{tag:"performance",title:"Async I/O — io_uring Revolution",desc:"Linux io_uring: submission/completion queues, zero-copy. 10x improvement over epoll for high IOPS.",src:"Kernel Docs",time:"25 min"},
{tag:"distributed",title:"CRDTs — Conflict-Free Replicated Data Types",desc:"G-Counter, PN-Counter, OR-Set, LWW-Register. Guaranteed convergence without coordination.",src:"CRDT Paper",time:"25 min"}],
// Day 44
[{tag:"redis",title:"Redis Sentinel vs Cluster vs Replication",desc:"When to use each HA strategy. Sentinel for small deployments, Cluster for sharding, replica for reads.",src:"Redis.io",time:"20 min"},
{tag:"architecture",title:"Outbox Pattern — Reliable Event Publishing",desc:"Write to DB and outbox table atomically. Poll outbox → publish to Kafka. Transactional messaging guarantee.",src:"microservices.io",time:"20 min"},
{tag:"cloud",title:"GCP Pub/Sub vs AWS SQS vs Kafka — Comparison",desc:"Managed vs self-hosted, ordering guarantees, exactly-once, cost models. Decision framework.",src:"Cloud Comparison",time:"20 min"}],
// Day 45
[{tag:"kafka",title:"Kafka Quotas & Multi-Tenancy",desc:"Producer/consumer byte-rate quotas, request-rate quotas. Isolating tenants on shared clusters.",src:"Confluent",time:"20 min"},
{tag:"database",title:"Database Replication — Sync vs Async vs Semi-Sync",desc:"Synchronous (zero data loss, high latency), async (fast, potential loss), semi-sync (compromise).",src:"MySQL Docs",time:"20 min"},
{tag:"distributed",title:"Bulkhead Pattern — Fault Isolation",desc:"Thread pool isolation, semaphore isolation. Prevent one slow service from consuming all resources.",src:"Resilience4j Docs",time:"15 min"}],
];
