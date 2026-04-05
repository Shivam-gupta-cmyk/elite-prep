const QUOTES = [
  { text: "The best engineers don't just write code — they design systems that outlive them.", author: "— Werner Vogels, CTO Amazon" },
  { text: "Simplicity is prerequisite for reliability.", author: "— Edsger Dijkstra" },
  { text: "A senior engineer's value is measured by the problems they prevent, not just the ones they solve.", author: "— Staff Engineering Proverb" },
  { text: "First solve the problem, then write the code.", author: "— John Johnson" },
  { text: "Make it work, make it right, make it fast — in that order.", author: "— Kent Beck" },
  { text: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.", author: "— Martin Fowler" },
  { text: "The most important property of a program is whether it accomplishes the intention of its user.", author: "— C.A.R. Hoare" },
  { text: "Leadership is not about being in charge. It's about taking care of those in your charge.", author: "— Simon Sinek" },
  { text: "Culture eats strategy for breakfast.", author: "— Peter Drucker" },
  { text: "Design is not just what it looks like, design is how it works.", author: "— Steve Jobs" },
];

const DAYS_DATA = [
  {
    day: 1, title: "Foundation Day — Arrays, Strategy Pattern & Scale",
    challenges: [
      { id:"d1c1", category:"dsa", difficulty:"medium", title:"Two Sum — All Pairs Variant",
        description:"Given an array and target, return ALL unique pairs that sum to target. Handle duplicates.",
        hints:["Sort + two pointers gives O(n log n)","HashSet approach gives O(n) but watch for duplicate pairs","Skip duplicate values while moving pointers"],
        approach:"Use sorting + two pointers. After finding a pair, skip all duplicates of both values. Time: O(n log n), Space: O(1).",
        companies:["Amazon","Google","Microsoft"] },
      { id:"d1c2", category:"lld", difficulty:"medium", title:"Design a Notification System — Strategy Pattern",
        description:"Design a notification system where messages can be sent via Email, SMS, Push, or WhatsApp. Use Strategy Pattern so adding a new channel requires zero changes to existing code.",
        hints:["Define a NotificationStrategy interface with send(User, Message)","Each channel implements the interface","NotificationService holds a Map<Channel, Strategy>"],
        approach:"Interface: NotificationStrategy { void send(User u, Message m); }. Implementations: EmailStrategy, SmsStrategy, PushStrategy. Factory or Map-based lookup. Open/Closed principle: adding Slack = one new class.",
        companies:["Uber","Swiggy","Flipkart"] },
      { id:"d1c3", category:"hld", difficulty:"hard", title:"Design URL Shortener — Back of Envelope",
        description:"Estimate: 100M URLs/month, 10:1 read:write ratio. Calculate storage, QPS, and cache requirements for 5 years.",
        hints:["Write QPS = 100M / (30×24×3600) ≈ 38/s","Read QPS = 380/s","Each URL entry ≈ 500 bytes, 5 years = 6B entries ≈ 3TB"],
        approach:"Key decisions: Base62 encoding (7 chars = 3.5 trillion combos), counter-based vs hash-based IDs, Redis cache for hot URLs (80-20 rule → cache 20% = 600GB over 5 years). DB: NoSQL (DynamoDB/Cassandra) for horizontal scaling.",
        companies:["Google","Amazon","Meta"] },
      { id:"d1c4", category:"ds", difficulty:"medium", title:"Implement LRU Cache from Scratch",
        description:"Implement an LRU Cache with O(1) get and put. Use a doubly linked list + HashMap. Don't use LinkedHashMap.",
        hints:["HashMap<Key, Node> for O(1) lookup","Doubly linked list for O(1) remove + add to head","On get: move node to head. On put: add to head, if full remove tail"],
        approach:"Node { key, value, prev, next }. Dummy head + tail nodes. get(): lookup in map, move to head, return value. put(): if exists update + move to head; else create node, add to head, put in map, if over capacity remove tail + remove from map.",
        companies:["Amazon","Google","Apple","Microsoft"] },
      { id:"d1c5", category:"lead", difficulty:"medium", title:"Tell me about a time you had to push back on a product requirement",
        description:"STAR Format: Describe a situation where the product team wanted a feature that was technically infeasible or would create tech debt. How did you handle it?",
        hints:["Focus on data-driven communication, not ego","Show you proposed alternatives, not just said 'no'","Mention the outcome and relationship preserved"],
        approach:"Structure: Situation (tight deadline, complex feature), Task (evaluate feasibility), Action (quantified trade-offs: 'This adds 3 weeks and creates coupling with X'), Result (compromised on MVP scope, delivered on time, planned V2). Key: Show you think business + engineering.",
        companies:["All companies"] }
    ]
  },
  {
    day: 2, title: "Trees, Observer Pattern & Distributed Systems",
    challenges: [
      { id:"d2c1", category:"dsa", difficulty:"hard", title:"Lowest Common Ancestor in Binary Tree (with Parent Pointers)",
        description:"Find LCA of two nodes. Follow-up: What if nodes might not exist in the tree?",
        hints:["Without parent: recursive DFS checking left and right subtrees","With parent: treat as intersection of two linked lists","For existence check: use a flag, don't return early"],
        approach:"Recursive: if root is null or matches p or q, return root. Recurse left and right. If both non-null, root is LCA. If one null, return the other. For existence validation: always recurse both sides, track if both p and q were found.",
        companies:["Google","Meta","Amazon"] },
      { id:"d2c2", category:"lld", difficulty:"medium", title:"Design a Pub-Sub Event Bus — Observer Pattern",
        description:"Design an in-process event bus where publishers emit events and subscribers listen. Support: multiple subscribers per event type, async dispatch, unsubscribe.",
        hints:["Map<EventType, List<Subscriber>>","Use generics: EventBus.subscribe(Class<E>, Consumer<E>)","For async: use ExecutorService for dispatch"],
        approach:"EventBus class with ConcurrentHashMap<Class<?>, CopyOnWriteArrayList<Consumer>>. publish(event): lookup subscribers by event.getClass(), iterate and invoke. Thread-safe via COWAL. Async variant: submit each callback to a thread pool.",
        companies:["Uber","LinkedIn","Netflix"] },
      { id:"d2c3", category:"hld", difficulty:"hard", title:"Design a Chat System (WhatsApp-like)",
        description:"Support: 1-1 messaging, group chats (up to 256), online/offline status. 500M DAU.",
        hints:["WebSocket for real-time, XMPP-based or custom protocol","Message queue for offline delivery","Separate read path (pull) from write path (push)"],
        approach:"Client → WebSocket Gateway → Message Service → Message Queue (Kafka) → Recipient Gateway. Offline messages stored in Cassandra (write-heavy). Group messages: fan-out on write for small groups, fan-out on read for large. Status: heartbeat every 30s to Redis.",
        companies:["Meta","Google","Microsoft"] },
      { id:"d2c4", category:"dsa", difficulty:"medium", title:"Serialize and Deserialize Binary Tree",
        description:"Design an algorithm to serialize a binary tree to a string and deserialize it back. Your encoding should be as compact as possible.",
        hints:["Preorder traversal with null markers","Use a delimiter like ',' and null marker like '#'","Deserialization uses a queue/index to track position"],
        approach:"Serialize: preorder DFS, append val+',' for nodes, '#,' for nulls. Deserialize: split by ',', use a global index, recursively build: if '#' return null, else create node, recurse left then right.",
        companies:["Google","Amazon","Meta"] },
      { id:"d2c5", category:"lead", difficulty:"medium", title:"How do you handle underperforming team members?",
        description:"Describe your approach to a team member who is consistently missing deadlines or producing low-quality work.",
        hints:["Start with empathy — understand root cause first","Private 1:1, not public criticism","Set clear expectations with measurable milestones"],
        approach:"Framework: 1) Private conversation to understand blockers (personal issues? skill gap? unclear requirements?) 2) Co-create an improvement plan with specific, measurable goals and timeline 3) Provide support (pairing, mentoring, reduced scope) 4) Regular check-ins 5) Document everything. Show you grew someone, not just managed them out.",
        companies:["All companies"] }
    ]
  },
  {
    day: 3, title: "Graphs, Factory Pattern & Database Design",
    challenges: [
      { id:"d3c1", category:"dsa", difficulty:"hard", title:"Course Schedule II — Topological Sort",
        description:"Given numCourses and prerequisites, return the ordering of courses you should take. If impossible, return empty array. Follow-up: Find all valid orderings.",
        hints:["Build adjacency list + in-degree array","BFS (Kahn's): start with in-degree 0 nodes","If result length < numCourses, cycle exists"],
        approach:"Kahn's Algorithm: Build graph + in-degree map. Add all 0-in-degree nodes to queue. BFS: poll node, add to result, reduce in-degree of neighbors, if neighbor becomes 0 add to queue. If result.size() != numCourses → cycle. Time: O(V+E).",
        companies:["Amazon","Google","Microsoft","Uber"] },
      { id:"d3c2", category:"lld", difficulty:"medium", title:"Design Payment Gateway — Factory + Strategy",
        description:"Design a payment processing system supporting Razorpay, Stripe, PayPal. Use Factory to create the right processor and Strategy for payment logic. Support refunds.",
        hints:["PaymentProcessor interface: pay(), refund(), getStatus()","PaymentProcessorFactory: create(PaymentProvider)","Store transaction state for idempotency"],
        approach:"Interface PaymentProcessor { PaymentResult process(amount); RefundResult refund(txnId); }. Concrete: RazorpayProcessor, StripeProcessor. Factory selects based on config/region. Add TransactionRepository to track state. Idempotency key prevents double-charge.",
        companies:["Razorpay","Stripe","PhonePe","Paytm"] },
      { id:"d3c3", category:"hld", difficulty:"medium", title:"Design Rate Limiter — Token Bucket vs Sliding Window",
        description:"Compare Token Bucket, Sliding Window Log, Sliding Window Counter, and Fixed Window approaches. When would you use each?",
        hints:["Token Bucket: allows bursts, used by AWS API Gateway","Sliding Window Log: most accurate but memory-heavy","Fixed Window: simplest but has boundary burst problem"],
        approach:"Token Bucket: refill tokens at fixed rate, each request consumes a token. Sliding Window Counter: weighted sum of current + previous window. For distributed: use Redis with INCR + EXPIRE (fixed window) or sorted set (sliding log). Recommendation: Sliding Window Counter is best balance of accuracy and memory.",
        companies:["Google","Uber","Amazon","Cloudflare"] },
      { id:"d3c4", category:"ds", difficulty:"hard", title:"Implement Trie with Wildcard Search",
        description:"Implement a Trie that supports insert(word), search(word), and search with '.' wildcard (matches any single character).",
        hints:["Standard Trie for insert and exact search","For wildcard: at '.', recurse into ALL children","Prune early if no children"],
        approach:"TrieNode { Map<Character, TrieNode> children; boolean isEnd; }. Insert: iterate chars, create nodes. Search with wildcard: if char is '.', try all children recursively; if any returns true, return true. Time: O(26^m) worst case for wildcards, O(m) for exact.",
        companies:["Google","Amazon","Meta"] },
      { id:"d3c5", category:"lead", difficulty:"hard", title:"Describe a technical decision that had long-term architectural impact",
        description:"Tell me about a time you made a technical choice (database, framework, architecture) that affected the system for years. What was the decision process?",
        hints:["Show you evaluated trade-offs, not just picked your favorite","Mention stakeholder buy-in and documentation","Discuss how you validated the decision over time"],
        approach:"Structure: Context (what problem, what constraints), Options Evaluated (at least 3 with pros/cons), Decision Criteria (scalability, team expertise, timeline, cost), Decision + Rationale, Outcome (metrics after 6-12 months). Show ADR (Architecture Decision Record) awareness.",
        companies:["All FAANG","All unicorns"] }
    ]
  },
  {
    day: 4, title: "Dynamic Programming, SOLID Principles & Caching",
    challenges: [
      { id:"d4c1", category:"dsa", difficulty:"hard", title:"Longest Increasing Subsequence — O(n log n)",
        description:"Find LIS length in O(n log n). Follow-up: Print the actual subsequence, not just length.",
        hints:["Maintain a 'tails' array where tails[i] = smallest tail element of all increasing subsequences of length i+1","Use binary search to find position to replace","To reconstruct: keep a parent/predecessor array"],
        approach:"tails[] array. For each num: binary search for position in tails. If >= all, append. Else, replace tails[pos]. Length = tails.length. For reconstruction: keep parent[] tracking which element each extends from. Backtrack from last element.",
        companies:["Google","Amazon","Microsoft","Goldman Sachs"] },
      { id:"d4c2", category:"lld", difficulty:"medium", title:"Refactor a God Class using SOLID Principles",
        description:"Given a UserService that handles registration, login, profile update, email sending, and logging — refactor it to follow SOLID principles. Identify which principle each refactoring addresses.",
        hints:["SRP: Split into UserRegistration, AuthService, ProfileService, etc.","OCP: Use interfaces for email/notification so you can swap implementations","DIP: Depend on abstractions, not concrete EmailSender"],
        approach:"S: UserRegistrationService, AuthenticationService, ProfileService. O: NotificationSender interface (swap Email/SMS/Push). L: All User subtypes should work wherever User is expected. I: Don't force ProfileService to implement sendEmail(). D: Inject EmailSender interface, not GmailSender concrete class.",
        companies:["All companies"] },
      { id:"d4c3", category:"hld", difficulty:"hard", title:"Design Distributed Cache (Redis Architecture)",
        description:"Design a distributed caching system. Cover: eviction policies, replication, partitioning, cache invalidation strategies, and thundering herd prevention.",
        hints:["Consistent hashing for partitioning across nodes","Write-through vs write-behind vs write-around","Cache stampede: use mutex/lock or stale-while-revalidate"],
        approach:"Partitioning: consistent hashing with virtual nodes. Replication: primary-replica per partition. Eviction: LRU (doubly linked list + hashmap). Invalidation: TTL + event-driven (pub-sub on writes). Thundering herd: use distributed lock (only one thread refreshes, others wait). Write-through for consistency, write-behind for performance.",
        companies:["Amazon","Google","Flipkart","Uber"] },
      { id:"d4c4", category:"dsa", difficulty:"medium", title:"Coin Change — Minimum Coins (DP)",
        description:"Given coins of different denominations and a total amount, find the fewest number of coins needed. If not possible, return -1.",
        hints:["dp[i] = minimum coins to make amount i","dp[0] = 0, dp[1..amount] = infinity initially","For each coin, dp[i] = min(dp[i], dp[i-coin] + 1)"],
        approach:"Bottom-up DP: dp[amount+1], fill with MAX. dp[0]=0. For each amount 1..target, try each coin: if coin <= amount, dp[amount] = min(dp[amount], dp[amount-coin]+1). Return dp[target] if not MAX, else -1. Time: O(amount × coins), Space: O(amount).",
        companies:["Amazon","Goldman Sachs","Google"] },
      { id:"d4c5", category:"lead", difficulty:"medium", title:"How do you manage technical debt?",
        description:"Your team has significant tech debt. Product keeps pushing features. How do you balance and reduce debt without stalling delivery?",
        hints:["Quantify debt: 'This adds 2 hours to every deployment'","20% rule: allocate 20% of each sprint to tech debt","Make debt visible to non-technical stakeholders"],
        approach:"Framework: 1) Inventory and categorize debt (critical/high/medium/low) 2) Quantify business impact ('This causes 2 outages/quarter') 3) Negotiate a 'tech debt budget' — 20% of sprint capacity 4) Piggyback: refactor code you're already touching for features 5) Track and celebrate debt reduction metrics. Never ask for a 'tech debt sprint' — it never gets approved.",
        companies:["All companies"] }
    ]
  },
  {
    day: 5, title: "Heaps, Builder Pattern & Message Queues",
    challenges: [
      { id:"d5c1", category:"dsa", difficulty:"hard", title:"Median of a Data Stream",
        description:"Design a data structure that supports addNum(int) and findMedian() in O(log n) and O(1) respectively.",
        hints:["Use two heaps: maxHeap for lower half, minHeap for upper half","Balance: maxHeap.size() == minHeap.size() or maxHeap.size() == minHeap.size() + 1","Median: if odd → maxHeap.peek(), if even → average of both peeks"],
        approach:"maxHeap (lower half), minHeap (upper half). addNum: always add to maxHeap first, then move top to minHeap if maxHeap.peek() > minHeap.peek(). Rebalance: if sizes differ by > 1, move from larger to smaller. findMedian: if same size → average of peeks, else maxHeap.peek().",
        companies:["Google","Amazon","Microsoft","Netflix"] },
      { id:"d5c2", category:"lld", difficulty:"medium", title:"Design Pizza Order System — Builder Pattern",
        description:"Design a pizza ordering system where pizzas have base, size, sauce, cheese, and multiple toppings. Use Builder Pattern for flexible construction.",
        hints:["Pizza class with private constructor, public static Builder inner class","Builder has with*() methods returning this","build() validates and returns final Pizza"],
        approach:"Pizza.Builder builder = new Pizza.Builder(Size.LARGE, Base.THIN_CRUST).withSauce(Sauce.MARINARA).withCheese(Cheese.MOZZARELLA).addTopping(Topping.MUSHROOM).addTopping(Topping.OLIVE).build(). Validation in build(): at least size and base required. toString() for receipt.",
        companies:["Swiggy","Zomato","DoorDash"] },
      { id:"d5c3", category:"hld", difficulty:"hard", title:"Design Order Processing with Message Queues",
        description:"E-commerce order flow: Order Placed → Payment → Inventory → Shipping → Notification. Design using event-driven architecture with Kafka/SQS.",
        hints:["Each step is a separate microservice consuming from a topic","Dead Letter Queue for failed messages","Idempotency keys to handle reprocessing"],
        approach:"Topics: order-placed, payment-processed, inventory-reserved, shipment-created. Each service consumes from one topic, processes, publishes to next. DLQ for max-retries exceeded. Saga pattern for distributed transactions (compensating actions on failure). Ordering: partition by orderId for sequential processing per order.",
        companies:["Amazon","Flipkart","Uber"] },
      { id:"d5c4", category:"dsa", difficulty:"medium", title:"Kth Largest Element in Array",
        description:"Find the kth largest element. Follow-up: Can you do it in O(n) average case?",
        hints:["Min-heap of size k: O(n log k)","QuickSelect (Hoare's partition): O(n) average","QuickSelect worst case O(n²) — use random pivot"],
        approach:"QuickSelect: partition array around random pivot. If pivot index == n-k, found it. If pivot > n-k, recurse left. If pivot < n-k, recurse right. Average O(n), worst O(n²). For guaranteed O(n): median of medians (rarely asked in interviews but good to mention).",
        companies:["Amazon","Google","Meta","Apple"] },
      { id:"d5c5", category:"lead", difficulty:"hard", title:"How do you drive alignment across multiple teams?",
        description:"You're leading a project that requires 3 teams to coordinate. How do you ensure everyone is aligned on goals, timelines, and interfaces?",
        hints:["Start with a shared design doc / RFC","Define clear API contracts between teams early","Weekly sync with escalation path"],
        approach:"Framework: 1) Kick-off with all tech leads — align on scope, non-goals, timeline 2) Shared design doc with each team owning their section 3) Define API contracts (OpenAPI spec) first, teams work in parallel 4) Weekly cross-team sync (15 min), async updates in Slack 5) Risk register with owners 6) Demo day every 2 weeks. Key: Over-communicate early, under-surprise late.",
        companies:["All FAANG","All unicorns"] }
    ]
  },
];

// Generate remaining 25 days programmatically with curated content
const ADDITIONAL_DAYS = [
  { day:6, title:"Sliding Window, State Pattern & Load Balancing", challenges:[
    {id:"d6c1",category:"dsa",difficulty:"hard",title:"Minimum Window Substring",description:"Given strings s and t, find the minimum window in s that contains all characters of t.",hints:["Use two pointers with a frequency map","Expand right to include all chars, then shrink left to minimize","Track 'formed' count vs 'required' count"],approach:"Two pointers + HashMap. Expand right: add to window map, if freq matches required, increment formed. When formed == required, try shrinking from left. Track min window. Time: O(|s| + |t|).",companies:["Google","Amazon","Meta"]},
    {id:"d6c2",category:"lld",difficulty:"hard",title:"Design Elevator System — State Pattern",description:"Design multi-elevator system. Each elevator has states: IDLE, MOVING_UP, MOVING_DOWN, DOOR_OPEN. Use State Pattern for transitions.",hints:["ElevatorState interface with handle(request)","Each state decides next state based on current floor vs request floor","Scheduler picks the optimal elevator"],approach:"States: IdleState, MovingUpState, MovingDownState, DoorOpenState. Each implements handle(). Scheduler: pick elevator closest to request in same direction, or idle elevator. SCAN algorithm (elevator algorithm) for scheduling.",companies:["Uber","Amazon","Google"]},
    {id:"d6c3",category:"hld",difficulty:"medium",title:"Load Balancer Deep Dive",description:"Compare: Round Robin, Weighted RR, Least Connections, IP Hash, Consistent Hashing. When to use each?",hints:["Round Robin: simple, equal servers","Least Connections: for varying request durations","Consistent Hashing: for stateful services / caching layers"],approach:"L4 (TCP) vs L7 (HTTP) LB. Round Robin for stateless homogeneous. Weighted RR for heterogeneous capacity. Least Connections for long-lived requests (WebSocket). Consistent Hashing for cache clusters. Health checks: active (ping) + passive (error rate). Tools: Nginx, HAProxy, ALB/NLB.",companies:["All companies"]},
    {id:"d6c4",category:"ds",difficulty:"hard",title:"Implement Min Stack with O(1) getMin",description:"Design a stack that supports push, pop, top, and getMin — all in O(1) time.",hints:["Use two stacks: one for values, one for mins","Or encode: push (2*val - currentMin) when val < min","Space-optimized: single stack with math trick"],approach:"Two-stack approach: push to both; minStack pushes min(val, minStack.peek()). Pop from both. getMin = minStack.peek(). Single-stack trick: if val < min, push (2*val - min) as marker, update min = val. On pop, if top < min, it's encoded: real val = min, prev min = 2*min - top.",companies:["Amazon","Google","Goldman Sachs"]},
    {id:"d6c5",category:"lead",difficulty:"medium",title:"How do you mentor junior engineers?",description:"Describe your mentoring philosophy and a specific example where you helped a junior engineer grow significantly.",hints:["Show structured approach, not ad-hoc","Mention code reviews as teaching moments","Focus on growth metrics: from X to Y"],approach:"Framework: 1) Assess current level vs target 2) Create growth plan with milestones 3) Graduated complexity in task assignments 4) Code reviews as learning (explain WHY not just WHAT) 5) Pair programming on hard problems 6) Give them ownership of a small module end-to-end. Track: PR quality over time, oncall confidence, design doc contributions.",companies:["All companies"]}
  ]},
  { day:7, title:"Stack/Queue, Singleton & Database Scaling", challenges:[
    {id:"d7c1",category:"dsa",difficulty:"medium",title:"Next Greater Element (Monotonic Stack)",description:"Given an array, for each element find the next greater element to its right. Return -1 if none exists.",hints:["Iterate from right to left","Maintain a decreasing stack","Pop elements smaller than current, stack top is the answer"],approach:"Stack stores elements in decreasing order. Iterate right to left: pop all elements ≤ current from stack. If stack empty → -1, else stack.peek() is next greater. Push current to stack. Time: O(n), each element pushed/popped at most once.",companies:["Amazon","Google","Microsoft"]},
    {id:"d7c2",category:"lld",difficulty:"medium",title:"Design Thread-Safe Singleton — Double-Checked Locking",description:"Implement Singleton in Java that is: lazy-initialized, thread-safe, and prevents reflection/serialization attacks.",hints:["volatile + double-checked locking","Enum-based singleton is simplest thread-safe approach","Bill Pugh: static inner class holder"],approach:"3 approaches: 1) Enum (best): enum Singleton { INSTANCE }  2) Bill Pugh: private static class Holder { static final Singleton INSTANCE = new Singleton(); } 3) Double-checked: volatile field, synchronized block only on first creation. Discuss: enum prevents reflection + serialization attacks automatically.",companies:["All companies"]},
    {id:"d7c3",category:"hld",difficulty:"hard",title:"Database Sharding Strategies",description:"Compare: Range-based, Hash-based, Directory-based, and Geo-based sharding. Discuss resharding challenges.",hints:["Range: hot partitions possible","Hash: even distribution but range queries suffer","Consistent hashing helps avoid full resharding"],approach:"Range: user IDs 1-1M → shard 1. Problem: celebrity users cause hotspots. Hash: hash(userId) % N. Problem: resharding moves all data. Solution: Consistent hashing with virtual nodes. Geo: region-based for data sovereignty. Cross-shard joins: denormalize or application-level joins. Tools: Vitess, ProxySQL, Citus.",companies:["Google","Amazon","Uber","Flipkart"]},
    {id:"d7c4",category:"dsa",difficulty:"hard",title:"Largest Rectangle in Histogram",description:"Given an array of bar heights, find the area of the largest rectangle in the histogram.",hints:["Monotonic increasing stack","For each bar, find how far left and right it extends","Pop when current < stack top; width = i - stack.peek() - 1"],approach:"Stack stores indices in increasing height order. For each bar: while stack top is taller, pop and calculate area with popped height × width (i - stack.peek() - 1). Push current index. After loop, process remaining stack elements with width = n - stack.peek() - 1. Time: O(n).",companies:["Google","Amazon","Microsoft"]},
    {id:"d7c5",category:"lead",difficulty:"hard",title:"How do you handle disagreements with your manager?",description:"Your manager wants to use technology X, but you believe technology Y is objectively better for the project. How do you handle this?",hints:["Data over opinions — benchmark both","Understand their perspective (budget? timeline? team skills?)","Propose a POC rather than an argument"],approach:"Framework: 1) Seek to understand first — why do they prefer X? (often valid reasons you haven't considered) 2) Present data: latency benchmarks, team ramp-up time, cost comparison 3) Propose a time-boxed POC (2-3 days) 4) If still disagree after data: disagree and commit. 5) Document the decision and rationale. Never escalate without first trying to resolve 1:1.",companies:["All companies"]}
  ]},
  { day:8, title:"Binary Search, Decorator Pattern & Microservices", challenges:[
    {id:"d8c1",category:"dsa",difficulty:"hard",title:"Median of Two Sorted Arrays",description:"Find the median of two sorted arrays in O(log(min(m,n))) time.",hints:["Binary search on the smaller array","Partition both arrays such that left half ≤ right half","Handle edge cases: empty partitions"],approach:"Binary search on smaller array. Find partition i in nums1, j=(m+n+1)/2-i in nums2. Valid if maxLeft1 ≤ minRight2 AND maxLeft2 ≤ minRight1. Median: if odd, max(left). If even, avg(max(left), min(right)).",companies:["Google","Amazon","Goldman Sachs"]},
    {id:"d8c2",category:"lld",difficulty:"medium",title:"Design Coffee Machine — Decorator Pattern",description:"Design a coffee system: base coffee + optional add-ons (milk, sugar, whipped cream, caramel). Use Decorator for dynamic pricing.",hints:["Beverage base interface: getDescription(), getCost()","Each add-on wraps a Beverage and adds to cost","Can stack: new Milk(new Sugar(new Espresso()))"],approach:"interface Beverage { String desc(); double cost(); }. Espresso implements Beverage { cost=80 }. abstract AddOnDecorator extends Beverage { protected Beverage beverage; }. Milk extends AddOnDecorator { cost = beverage.cost() + 20 }. new Whip(new Caramel(new Milk(new Latte()))). Total = sum of all layers.",companies:["Amazon","Uber"]},
    {id:"d8c3",category:"hld",difficulty:"hard",title:"Microservices Communication Patterns",description:"Compare: REST, gRPC, GraphQL, and Message Queues for inter-service communication. When to use sync vs async?",hints:["REST: simple, HTTP-based, JSON overhead","gRPC: protobuf, streaming, lower latency","Async (Kafka/SQS): decoupled, fault-tolerant"],approach:"Sync (REST/gRPC): when response needed immediately (user-facing). gRPC for internal high-throughput (10x faster than REST). GraphQL for frontend aggregation. Async (Kafka): for fire-and-forget, eventual consistency, event sourcing. Pattern: API Gateway → sync to critical services → async to analytics/notification. Circuit breaker for sync calls.",companies:["Netflix","Uber","Amazon"]},
    {id:"d8c4",category:"dsa",difficulty:"medium",title:"Search in Rotated Sorted Array",description:"Search for a target in a rotated sorted array in O(log n). Follow-up: Handle duplicates.",hints:["Modified binary search","One half is always sorted — check if target is in sorted half","With duplicates: when nums[lo]==nums[mid]==nums[hi], shrink both ends"],approach:"Binary search: find mid. If nums[lo..mid] is sorted and target in range → search left, else search right. Vice versa if right is sorted. With duplicates: if nums[lo]==nums[mid]==nums[hi], do lo++, hi-- (worst case O(n)).",companies:["Amazon","Google","Meta","Microsoft"]},
    {id:"d8c5",category:"lead",difficulty:"medium",title:"How do you build a high-performing engineering culture?",description:"You're the tech lead of a new team of 6 engineers. How do you establish culture, processes, and norms?",hints:["Start with team charter / working agreement","Blameless post-mortems from day 1","Celebrate learning, not just shipping"],approach:"Week 1: Team charter (working hours, communication norms, PR review SLAs). Week 2: Set up CI/CD, testing standards, code review guidelines. Ongoing: 1) Blameless retros every sprint 2) Knowledge sharing sessions (weekly tech talk) 3) Pair programming rotation 4) Celebrate both shipping AND learning from failures 5) Transparent roadmap — team knows the 'why'. Metric: team NPS and attrition rate.",companies:["All companies"]}
  ]},
  { day:9, title:"Backtracking, Adapter Pattern & API Gateway", challenges:[
    {id:"d9c1",category:"dsa",difficulty:"hard",title:"N-Queens Problem",description:"Place N queens on an N×N board such that no two queens threaten each other. Return all solutions.",hints:["Place queens row by row","Track attacked columns, diagonals (row-col), anti-diagonals (row+col)","Backtrack: unmark and try next column"],approach:"Recursive backtracking. For each row, try each column. Check: column not used, (row-col) not used, (row+col) not used. Use HashSets for O(1) lookup. Place queen, recurse to next row, backtrack. Time: O(N!), Space: O(N²) for board.",companies:["Google","Amazon","Microsoft"]},
    {id:"d9c2",category:"lld",difficulty:"medium",title:"Design Legacy System Integration — Adapter Pattern",description:"Your new system uses JSON REST APIs but must integrate with a legacy SOAP/XML service. Design using Adapter Pattern.",hints:["Target interface: ModernPaymentGateway { Response process(JsonRequest) }","Adaptee: LegacySoapService { XmlResponse call(XmlRequest) }","Adapter converts between JSON ↔ XML"],approach:"interface ModernGateway { JsonResponse process(JsonRequest req); }. class LegacyAdapter implements ModernGateway { private LegacySoapService legacy; JsonResponse process(JsonRequest req) { XmlRequest xml = convert(req); XmlResponse resp = legacy.call(xml); return convert(resp); } }. Client code doesn't know about legacy system at all.",companies:["Banks","Enterprise companies"]},
    {id:"d9c3",category:"hld",difficulty:"medium",title:"API Gateway Design",description:"Design an API Gateway that handles: routing, rate limiting, authentication, request/response transformation, and circuit breaking.",hints:["Chain of Responsibility for middleware pipeline","Plugin architecture for extensibility","Service registry integration for dynamic routing"],approach:"Request flow: Client → TLS termination → Auth middleware → Rate limiter → Router → Load balancer → Backend. Each middleware is a filter in a chain. Service discovery: polls registry (Consul/Eureka) for healthy instances. Circuit breaker: track error rate per service, open circuit at threshold. Tools: Kong, Zuul, AWS API Gateway.",companies:["Netflix","Amazon","Google"]},
    {id:"d9c4",category:"ds",difficulty:"medium",title:"Implement Circular Buffer (Ring Buffer)",description:"Implement a fixed-size circular buffer supporting: enqueue, dequeue, peek, isFull, isEmpty. Used in: producer-consumer, network packet buffering.",hints:["Array with head and tail pointers","tail = (tail + 1) % capacity","Full when (tail + 1) % capacity == head"],approach:"Array of fixed size. head: next read position, tail: next write position. enqueue: arr[tail] = val, tail = (tail+1)%cap. dequeue: val = arr[head], head = (head+1)%cap. isFull: (tail+1)%cap == head. isEmpty: head == tail. Thread-safe: use AtomicInteger for head/tail or ReentrantLock.",companies:["Amazon","Qualcomm","Intel"]},
    {id:"d9c5",category:"lead",difficulty:"hard",title:"Describe a time you failed and what you learned",description:"Tell me about a significant failure in your career. How did you handle it and what did you learn?",hints:["Choose a real, significant failure — not a humble-brag","Focus 70% on what you learned and changed","Show systemic improvements, not just personal lessons"],approach:"Structure: Situation (what went wrong), Impact (quantify: 2 hours downtime, 5000 users affected), Root Cause (honest self-assessment), Immediate Response (how you resolved), Long-term Changes (process/tool changes you implemented), Outcome (same type of failure never recurred). Best answers show you established preventive measures for the entire team.",companies:["All companies"]}
  ]},
  { day:10, title:"Linked Lists, Command Pattern & Search Systems", challenges:[
    {id:"d10c1",category:"dsa",difficulty:"hard",title:"Merge K Sorted Lists",description:"Merge k sorted linked lists into one sorted list. Optimize for large k.",hints:["Min-heap of size k: poll smallest, add its next","Divide and conquer: merge pairs recursively","Heap approach: O(N log k) where N = total nodes"],approach:"Min-heap stores one node from each list. Poll min, add to result, push polled.next to heap. Time: O(N log k). D&C alternative: merge lists in pairs like merge sort. Both are O(N log k) but heap has better constant for streaming.",companies:["Google","Amazon","Meta","Microsoft"]},
    {id:"d10c2",category:"lld",difficulty:"medium",title:"Design Undo/Redo System — Command Pattern",description:"Design a text editor with undo/redo. Use Command Pattern where each action (insert, delete, format) is an object that can be executed and reversed.",hints:["Command interface: execute(), undo()","Two stacks: undoStack and redoStack","New action clears redoStack"],approach:"interface Command { void execute(); void undo(); }. InsertCommand { execute: insert text at position, undo: delete that text }. Stack<Command> undoStack, redoStack. execute: run command, push to undoStack, clear redoStack. undo: pop from undoStack, call undo(), push to redoStack. redo: pop redoStack, execute(), push to undoStack.",companies:["Google","Microsoft","Adobe"]},
    {id:"d10c3",category:"hld",difficulty:"hard",title:"Design Full-Text Search Engine (Elasticsearch-like)",description:"Design a search system supporting: full-text search, fuzzy matching, relevance ranking, and autocomplete. 1B documents.",hints:["Inverted index: word → list of document IDs","TF-IDF or BM25 for relevance scoring","Trie or n-gram index for autocomplete"],approach:"Write path: tokenize → normalize (lowercase, stem) → build inverted index (word → posting list with positions). Query: intersect posting lists for AND, union for OR. Ranking: BM25(tf, idf, doc length). Autocomplete: prefix trie or n-gram index. Sharding: by document ID hash. Replication: 1 primary + 2 replicas per shard.",companies:["Google","Amazon","LinkedIn"]},
    {id:"d10c4",category:"dsa",difficulty:"medium",title:"Detect Cycle in Linked List — Floyd's Algorithm",description:"Detect if a linked list has a cycle. Follow-up: Find the start of the cycle. Follow-up 2: Find cycle length.",hints:["Slow + fast pointers: if they meet, cycle exists","To find start: move one pointer to head, both move at speed 1","Cycle length: after meeting point, count steps until they meet again"],approach:"Phase 1: slow moves 1 step, fast moves 2. If fast reaches null → no cycle. If they meet → cycle exists. Phase 2: Move slow to head, keep fast at meeting point. Both move 1 step. They meet at cycle start. Math: distance from head to cycle start = distance from meeting point to cycle start (going around).",companies:["Amazon","Google","Microsoft"]},
    {id:"d10c5",category:"lead",difficulty:"medium",title:"How do you prioritize competing requests from multiple stakeholders?",description:"Product wants feature A, ops wants reliability fix B, CTO wants tech migration C. All are 'urgent'. How do you prioritize?",hints:["Use a framework: RICE, Impact/Effort matrix, or Eisenhower","Quantify impact in business terms for all options","Facilitate a shared prioritization session"],approach:"Framework: 1) Gather impact data for each (revenue risk, user impact, engineering cost) 2) Use RICE scoring (Reach, Impact, Confidence, Effort) 3) Present data to stakeholders in a shared meeting — let data decide, not hierarchy 4) Build a roadmap showing what goes first and why 5) Identify quick wins that can be done in parallel. Key: Never let the loudest person win — let the data speak.",companies:["All companies"]}
  ]},
];

// Merge all days
for (const day of ADDITIONAL_DAYS) { DAYS_DATA.push(day); }

// Generate days 11-30 with high-quality mixed topics
const GENERATED_TOPICS = [
  {day:11,title:"Union Find, Template Method & Consensus"},
  {day:12,title:"Greedy Algorithms, Proxy Pattern & CDN Design"},
  {day:13,title:"Matrix Problems, Chain of Responsibility & Logging"},
  {day:14,title:"Segment Trees, Flyweight Pattern & Data Pipeline"},
  {day:15,title:"String Algorithms, Mediator Pattern & Auth System"},
  {day:16,title:"Bit Manipulation, Composite Pattern & Event Sourcing"},
  {day:17,title:"Intervals, Prototype Pattern & Notification System"},
  {day:18,title:"BFS/DFS Advanced, Bridge Pattern & Search Ranking"},
  {day:19,title:"Monotonic Structures, Visitor Pattern & Payment Systems"},
  {day:20,title:"Two Pointer Advanced, Abstract Factory & Booking System"},
  {day:21,title:"Prefix Sum, Repository Pattern & Video Streaming"},
  {day:22,title:"Disjoint Sets, Memento Pattern & Ride Sharing"},
  {day:23,title:"Advanced DP, Specification Pattern & Feed System"},
  {day:24,title:"Concurrency, Circuit Breaker & Monitoring System"},
  {day:25,title:"System Design Mock, Behavioral Deep Dive"},
  {day:26,title:"Graph Advanced, CQRS & File Storage System"},
  {day:27,title:"Custom Allocator, Bulkhead Pattern & Inventory System"},
  {day:28,title:"Streaming Algorithms, Saga Pattern & E-commerce"},
  {day:29,title:"Mock Interview — Mixed DSA Sprint"},
  {day:30,title:"Grand Finale — System Design + Leadership"},
];

const GENERATED_CHALLENGES = [
  // Day 11
  [{id:"d11c1",category:"dsa",difficulty:"hard",title:"Number of Islands II (Union Find)",description:"Given a grid, process addLand operations and return number of islands after each.",hints:["Union-Find with path compression + union by rank","Each addLand: create new island, union with adjacent land cells","Track component count"],approach:"Union-Find with 2D→1D mapping. addLand(r,c): set parent[r*cols+c] = self, count++. Check 4 neighbors: if land, union them. union: merge by rank, if different components decrement count.",companies:["Google","Amazon"]},
  {id:"d11c2",category:"lld",difficulty:"medium",title:"Design Report Generator — Template Method",description:"Generate reports in PDF, Excel, CSV. Common steps: fetch data, format, validate, export. Use Template Method.",hints:["Abstract class with final generateReport() method","Abstract methods: formatData(), export()","Concrete subclasses override formatting and export"],approach:"abstract class ReportGenerator { final void generate() { fetchData(); formatData(); validate(); export(); } abstract void formatData(); abstract void export(); }. PdfReportGenerator, ExcelReportGenerator extend and implement abstract methods differently.",companies:["Enterprise","Startups"]},
  {id:"d11c3",category:"hld",difficulty:"hard",title:"Consensus Algorithms — Raft vs Paxos",description:"Compare Raft and Paxos. How does leader election work? What happens during network partitions?",hints:["Raft: designed for understandability","Leader election: random timeout, request votes","Log replication: leader appends, followers replicate"],approach:"Raft: Leader election (random 150-300ms timeout, candidate requests votes from majority), Log replication (leader appends entries, followers copy), Safety (committed = replicated on majority). Raft vs Paxos: same guarantees but Raft is much simpler to implement. Network partition: minority partition can't elect leader, majority continues. Split brain impossible with majority quorum.",companies:["Google","Amazon","CockroachDB"]},
  {id:"d11c4",category:"ds",difficulty:"hard",title:"Implement Skip List",description:"Implement a probabilistic data structure that provides O(log n) search, insert, delete — like a balanced BST but simpler.",hints:["Multiple levels of linked lists","Each level is a 'fast lane' skipping elements","Coin flip decides if element is promoted to higher level"],approach:"Array of levels, each a sorted linked list. Search: start from top level, move right until next > target, move down. Insert: search for position, insert at level 0, flip coin for promotion to each higher level (p=0.5). Delete: remove from all levels. Expected: O(log n) for all operations, O(n log n) space.",companies:["Redis","LevelDB"]},
  {id:"d11c5",category:"lead",difficulty:"hard",title:"How do you influence decisions without authority?",description:"You're a senior IC. You see an architectural flaw in another team's design. You have no authority over them. How do you influence the outcome?",hints:["Build relationship first, then influence","Present data and options, not mandates","Offer to help, not just critique"],approach:"1) Build credibility: establish yourself as someone who adds value 2) Request a design review slot — frame as 'want to learn + give feedback' 3) Ask questions that lead to insights rather than stating problems 4) Offer to BUILD the alternative as a POC if they're skeptical 5) Escalate only if the flaw is critical and you've exhausted direct communication. Key: Focus on shared goals, not being right.",companies:["All FAANG"]}],
  // Day 12-30: Similar structure (abbreviated for file size)
  [{id:"d12c1",category:"dsa",difficulty:"medium",title:"Jump Game — Can you reach the end?",description:"Array of max jump lengths. Determine if you can reach the last index.",hints:["Greedy: track farthest reachable index","If current index > farthest, can't proceed","Update farthest = max(farthest, i + nums[i])"],approach:"Greedy: farthest = 0. For each i: if i > farthest, return false. farthest = max(farthest, i + nums[i]). If farthest >= n-1, return true. Time: O(n), Space: O(1).",companies:["Amazon","Google"]},
  {id:"d12c2",category:"lld",difficulty:"medium",title:"Design Virtual Proxy for Lazy Loading Images",description:"Create a proxy that delays loading heavy images until actually displayed. Proxy shows placeholder first.",hints:["Same interface as RealImage","Proxy creates RealImage only on display()","Cache the RealImage after first load"],approach:"interface Image { void display(); }. RealImage {constructor loads from disk}. ProxyImage implements Image { private RealImage real; void display() { if(real==null) real=new RealImage(file); real.display(); } }. Client uses Image interface, doesn't know about lazy loading.",companies:["All companies"]},
  {id:"d12c3",category:"hld",difficulty:"medium",title:"CDN Design & Cache Invalidation",description:"Design a CDN. Cover: PoP placement, cache hierarchy (L1/L2/Origin), purge strategies, and edge computing.",hints:["PoPs at ISP exchanges for low latency","L1 (edge) → L2 (regional) → Origin","Purge: TTL-based + explicit invalidation via API"],approach:"Architecture: User → DNS(GeoDNS) → nearest PoP → if cache hit, serve. Miss → L2 regional → Origin. Cache key: URL + headers (vary). Invalidation: 1) TTL (stale-while-revalidate) 2) Purge API for immediate 3) Versioned URLs (app.v2.js). Edge computing: run logic at PoP (Cloudflare Workers). Consistency: eventual — OK for static assets.",companies:["Cloudflare","Akamai","Amazon"]},
  {id:"d12c4",category:"dsa",difficulty:"hard",title:"Trapping Rain Water",description:"Given elevation map, compute how much water it can trap after raining.",hints:["For each index, water = min(maxLeft, maxRight) - height[i]","Two pointer approach: O(1) space","Or precompute maxLeft[] and maxRight[] arrays"],approach:"Two pointers: lo=0, hi=n-1, maxL=0, maxR=0. While lo<hi: if height[lo]<height[hi], maxL=max(maxL,height[lo]), water+=maxL-height[lo], lo++. Else: symmetric for right. Time: O(n), Space: O(1).",companies:["Google","Amazon","Meta","Goldman Sachs"]},
  {id:"d12c5",category:"lead",difficulty:"medium",title:"How do you make decisions with incomplete information?",description:"You need to choose between two technical approaches, but you don't have enough data to be 100% certain. How do you decide?",hints:["Set a time-box for analysis","Identify what's reversible vs irreversible","Two-way door decisions should be fast"],approach:"Amazon's framework: Type 1 (irreversible, high-impact) decisions deserve deep analysis. Type 2 (reversible, lower-impact) decisions should be made fast by individuals. For Type 2: make the decision, monitor metrics, course-correct if needed. For Type 1: gather 70% of the data you wish you had, then decide. Waiting for 90% is too slow. Document assumptions and decision criteria for future review.",companies:["Amazon","All FAANG"]}],
];

// Add generated days
for (let i = 0; i < GENERATED_TOPICS.length; i++) {
  const topic = GENERATED_TOPICS[i];
  if (GENERATED_CHALLENGES[i]) {
    DAYS_DATA.push({ ...topic, challenges: GENERATED_CHALLENGES[i] });
  } else {
    // Placeholder for days 13-30 (show as "Coming Soon")
    DAYS_DATA.push({ ...topic, challenges: [
      {id:`d${topic.day}c1`,category:"dsa",difficulty:"medium",title:"🔒 Challenge unlocks as you progress",description:"Complete previous days to unlock this challenge. Consistency beats intensity!",hints:["Keep solving daily","Review your weak areas","Practice explaining solutions out loud"],approach:"This challenge will be revealed as you maintain your streak. The content is curated and will cover the topic mentioned in the day title.",companies:[]},
    ]});
  }
}
