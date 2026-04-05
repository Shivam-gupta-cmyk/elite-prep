// ═══ ENRICHED PHASE 1D: Days 16-18 (Full Solutions) ═══
// Override template-generated days with detailed content

(function() {
// Day 16
const day16idx = DAYS_DATA.findIndex(d => d.day === 16);
if (day16idx !== -1) DAYS_DATA[day16idx] = {day:16,title:"Greedy Algorithms, Iterator Pattern & Payment Systems",challenges:[
{id:"d16c1",category:"dsa",difficulty:"medium",title:"Jump Game",
description:"Given an integer array nums, you are initially positioned at the first index. Each element represents your maximum jump length. Return true if you can reach the last index.",
hints:["Track the farthest index you can reach","If current index > farthest reachable, return false","Greedy: update farthest at each step"],
approach:"Greedy approach: maintain a variable 'maxReach'. Iterate through array — if i > maxReach, you're stuck (return false). Otherwise update maxReach = max(maxReach, i + nums[i]). If maxReach >= last index, return true. O(n) time, O(1) space.",
code:`public boolean canJump(int[] nums) {
    int maxReach = 0;
    for (int i = 0; i < nums.length; i++) {
        if (i > maxReach) return false;
        maxReach = Math.max(maxReach, i + nums[i]);
        if (maxReach >= nums.length - 1) return true;
    }
    return true;
}`,companies:["Amazon","Google","Microsoft"]},
{id:"d16c2",category:"dsa",difficulty:"medium",title:"Gas Station",
description:"There are n gas stations along a circular route. You have gas[i] fuel at station i and cost[i] to travel to next station. Find the starting station index to complete the circuit, or -1.",
hints:["If total gas >= total cost, solution exists","Track current tank — if it goes negative, reset start","The answer is unique if it exists"],
approach:"Key insight: if total gas >= total cost, a solution must exist. Track currentTank — when it goes negative, the start must be AFTER that point. Reset start to i+1 and currentTank to 0. O(n) time.",
code:`public int canCompleteCircuit(int[] gas, int[] cost) {
    int totalTank = 0, currentTank = 0, start = 0;
    for (int i = 0; i < gas.length; i++) {
        int diff = gas[i] - cost[i];
        totalTank += diff;
        currentTank += diff;
        if (currentTank < 0) {
            start = i + 1;
            currentTank = 0;
        }
    }
    return totalTank >= 0 ? start : -1;
}`,companies:["Amazon","Google","Bloomberg"]},
{id:"d16c3",category:"dsa",difficulty:"hard",title:"Activity Selection (Weighted Job Scheduling)",
description:"Given jobs with start times, end times, and profits, find the maximum profit subset of non-overlapping jobs. This extends classic greedy with DP.",
hints:["Sort by end time","For each job, binary search for latest non-conflicting job","DP: dp[i] = max(profit[i] + dp[lastNonConflict], dp[i-1])"],
approach:"Sort by end time. dp[i] = max(include job i, exclude job i). If including, add profit + dp[lastNonConflict]. Use binary search to find last non-conflicting job. O(n log n).",
code:`public int jobScheduling(int[] startTime, int[] endTime, int[] profit) {
    int n = startTime.length;
    int[][] jobs = new int[n][3];
    for (int i = 0; i < n; i++) jobs[i] = new int[]{startTime[i], endTime[i], profit[i]};
    Arrays.sort(jobs, (a, b) -> a[1] - b[1]);
    
    int[] dp = new int[n];
    dp[0] = jobs[0][2];
    for (int i = 1; i < n; i++) {
        int include = jobs[i][2];
        int lo = 0, hi = i - 1, last = -1;
        while (lo <= hi) {
            int mid = (lo + hi) / 2;
            if (jobs[mid][1] <= jobs[i][0]) { last = mid; lo = mid + 1; }
            else hi = mid - 1;
        }
        if (last != -1) include += dp[last];
        dp[i] = Math.max(dp[i - 1], include);
    }
    return dp[n - 1];
}`,companies:["Amazon","Google","Uber"]},
{id:"d16c4",category:"lld",difficulty:"medium",title:"Custom Iterator for Paginated API",
description:"Design an iterator that fetches data from a paginated API lazily. Implement hasNext() and next() that transparently handle page fetching.",
hints:["Use Iterator<T> interface","Buffer one page at a time","Fetch next page when current buffer is exhausted"],
approach:"Implement Iterator pattern with internal buffer. Constructor fetches first page. next() returns from buffer; when buffer empty, fetch next page. hasNext() checks buffer + whether more pages exist.",
code:`public class PaginatedIterator<T> implements Iterator<T> {
    private final ApiClient client;
    private List<T> buffer;
    private int bufferIdx;
    private int currentPage;
    private boolean hasMorePages;

    public PaginatedIterator(ApiClient client) {
        this.client = client;
        this.currentPage = 0;
        this.bufferIdx = 0;
        this.hasMorePages = true;
        fetchNextPage();
    }

    private void fetchNextPage() {
        PageResponse<T> response = client.getPage(currentPage++);
        buffer = response.getData();
        bufferIdx = 0;
        hasMorePages = response.hasNextPage();
    }

    @Override
    public boolean hasNext() {
        if (bufferIdx < buffer.size()) return true;
        if (hasMorePages) { fetchNextPage(); return !buffer.isEmpty(); }
        return false;
    }

    @Override
    public T next() {
        if (!hasNext()) throw new NoSuchElementException();
        return buffer.get(bufferIdx++);
    }
}`,companies:["Amazon","Flipkart","Uber"]},
{id:"d16c5",category:"hld",difficulty:"hard",title:"Design Payment System (Razorpay/Stripe)",
description:"Design a payment gateway handling 10K+ TPS. Cover: payment flow, idempotency, PCI compliance, reconciliation, refunds, and webhook notifications.",
hints:["Payment states: INITIATED → PROCESSING → SUCCESS/FAILED","Idempotency key prevents duplicate charges","Async webhook delivery with retry"],
approach:"Components: API Gateway → Payment Orchestrator → Payment Provider Adapter (Strategy Pattern) → Ledger Service → Notification Service. Key decisions: (1) Idempotency via unique payment_id + dedup check, (2) Double-entry ledger for reconciliation, (3) Saga pattern for multi-step payments, (4) PCI DSS: tokenize card data, never store raw. Scale: partition by merchant_id, CQRS for read-heavy dashboards.",
companies:["Razorpay","Stripe","PhonePe","Google"]},
{id:"d16c6",category:"ds",difficulty:"medium",title:"Implement Sorted Set (TreeSet)",
description:"Implement a SortedSet backed by a balanced BST. Support: add, remove, contains, floor, ceiling, first, last — all in O(log n).",
hints:["Use a self-balancing BST (AVL or Red-Black)","floor(x): largest element <= x","ceiling(x): smallest element >= x"],
approach:"Implement using AVL tree internally. Each node stores value + height + left/right. Rotations maintain balance. floor/ceiling: traverse tree, tracking best candidate. O(log n) for all operations.",
code:`public class SortedSet<T extends Comparable<T>> {
    private class Node { T val; Node left, right; int height; 
        Node(T v) { val=v; height=1; }
    }
    private Node root;
    
    private int height(Node n) { return n == null ? 0 : n.height; }
    private int balance(Node n) { return n == null ? 0 : height(n.left) - height(n.right); }
    
    private Node rotateRight(Node y) {
        Node x = y.left; y.left = x.right; x.right = y;
        y.height = 1 + Math.max(height(y.left), height(y.right));
        x.height = 1 + Math.max(height(x.left), height(x.right));
        return x;
    }
    
    public void add(T val) { root = insert(root, val); }
    private Node insert(Node node, T val) {
        if (node == null) return new Node(val);
        int cmp = val.compareTo(node.val);
        if (cmp < 0) node.left = insert(node.left, val);
        else if (cmp > 0) node.right = insert(node.right, val);
        else return node; // duplicate
        node.height = 1 + Math.max(height(node.left), height(node.right));
        return rebalance(node);
    }
    
    public T floor(T val) {
        Node curr = root; T result = null;
        while (curr != null) {
            int cmp = val.compareTo(curr.val);
            if (cmp == 0) return curr.val;
            if (cmp > 0) { result = curr.val; curr = curr.right; }
            else curr = curr.left;
        }
        return result;
    }
}`,companies:["Amazon","Google"]},
{id:"d16c7",category:"lead",difficulty:"medium",title:"How do you communicate bad news to stakeholders?",
description:"Describe a time when you had to deliver bad news (missed deadline, production incident, tech debt reality). How did you frame it?",
hints:["Be transparent but solution-oriented","Don't sugarcoat — present facts + impact + plan","Use STAR format with emphasis on your communication approach"],
approach:"STAR: Set context of the bad news situation. Describe your specific communication strategy: (1) Facts first — what happened, (2) Impact — who's affected and how, (3) Root cause — why it happened, (4) Remediation plan — what you're doing about it, (5) Prevention — how you'll avoid it next time. Show emotional intelligence and leadership maturity.",
companies:["All companies"]}
]};

// Day 17
const day17idx = DAYS_DATA.findIndex(d => d.day === 17);
if (day17idx !== -1) DAYS_DATA[day17idx] = {day:17,title:"Bit Manipulation, Facade Pattern & Monitoring",challenges:[
{id:"d17c1",category:"dsa",difficulty:"medium",title:"Single Number (XOR Trick)",
description:"Given a non-empty array where every element appears twice except one, find that single element. Must be O(n) time, O(1) space.",
hints:["XOR of a number with itself = 0","XOR of a number with 0 = the number itself","XOR all elements together"],
approach:"XOR all elements: duplicates cancel out (a ^ a = 0), leaving only the single number. This works because XOR is commutative and associative. O(n) time, O(1) space — the most elegant solution.",
code:`public int singleNumber(int[] nums) {
    int result = 0;
    for (int num : nums) result ^= num;
    return result;
}

// Follow-up: Single Number II (every element appears 3 times except one)
public int singleNumberII(int[] nums) {
    int ones = 0, twos = 0;
    for (int num : nums) {
        ones = (ones ^ num) & ~twos;
        twos = (twos ^ num) & ~ones;
    }
    return ones;
}`,companies:["Amazon","Google","Apple"]},
{id:"d17c2",category:"dsa",difficulty:"medium",title:"Counting Bits",
description:"Given an integer n, return an array ans of length n+1 where ans[i] is the number of 1's in the binary representation of i.",
hints:["DP: bits[i] = bits[i >> 1] + (i & 1)","Right shift removes last bit, (i & 1) checks if last bit is 1","Build on previously computed results"],
approach:"DP relation: the bit count of i equals bit count of i/2 (right shift) plus whether i is odd (last bit). dp[i] = dp[i >> 1] + (i & 1). O(n) time, O(n) space.",
code:`public int[] countBits(int n) {
    int[] dp = new int[n + 1];
    for (int i = 1; i <= n; i++) {
        dp[i] = dp[i >> 1] + (i & 1);
    }
    return dp;
}`,companies:["Google","Microsoft","Amazon"]},
{id:"d17c3",category:"dsa",difficulty:"medium",title:"Reverse Bits",
description:"Reverse bits of a given 32-bit unsigned integer. For input 43261596 (00000010100101000001111010011100), return 964176192 (00111001011110000010100101000000).",
hints:["Extract each bit from right, place it from left","Use bit shift and OR operations","Process all 32 bits"],
approach:"For each of 32 bits: extract LSB of n (n & 1), shift result left and OR with extracted bit, shift n right. O(32) = O(1) time.",
code:`public int reverseBits(int n) {
    int result = 0;
    for (int i = 0; i < 32; i++) {
        result = (result << 1) | (n & 1);
        n >>= 1;
    }
    return result;
}`,companies:["Apple","Amazon","Microsoft"]},
{id:"d17c4",category:"lld",difficulty:"medium",title:"Simplify Complex Subsystem — Facade Pattern",
description:"Design a HomeTheater Facade that simplifies controlling TV, sound system, streaming device, and lights through a single 'watchMovie()' and 'endMovie()' interface.",
hints:["Facade wraps multiple subsystem classes","Client only interacts with the Facade","Each subsystem can still be used independently"],
approach:"Create subsystem classes (TV, SoundSystem, StreamingPlayer, Lights). Facade class composes all subsystems and exposes high-level methods that orchestrate multiple subsystem calls. Client code becomes dramatically simpler.",
code:`// Subsystems
class TV { void on(){} void setInput(String s){} void off(){} }
class SoundSystem { void on(){} void setVolume(int v){} void setSurround(){} void off(){} }
class StreamingPlayer { void on(){} void play(String movie){} void stop(){} void off(){} }
class SmartLights { void dim(int level){} void on(){} }

// Facade
class HomeTheaterFacade {
    private final TV tv; private final SoundSystem sound;
    private final StreamingPlayer player; private final SmartLights lights;
    
    public HomeTheaterFacade(TV tv, SoundSystem sound, 
            StreamingPlayer player, SmartLights lights) {
        this.tv = tv; this.sound = sound;
        this.player = player; this.lights = lights;
    }
    
    public void watchMovie(String movie) {
        System.out.println("=== Setting up movie: " + movie + " ===");
        lights.dim(10);
        tv.on(); tv.setInput("HDMI1");
        sound.on(); sound.setSurround(); sound.setVolume(25);
        player.on(); player.play(movie);
    }
    
    public void endMovie() {
        System.out.println("=== Shutting down ===");
        player.stop(); player.off();
        sound.off(); tv.off(); lights.on();
    }
}`,companies:["Amazon","Flipkart","Uber"]},
{id:"d17c5",category:"hld",difficulty:"hard",title:"Design Monitoring & Alerting System",
description:"Design a system like Datadog/Prometheus+Grafana. Handle 1M+ metrics per second. Support dashboards, alerts, anomaly detection.",
hints:["Time-series DB for metric storage","Push vs Pull model trade-offs","Alert evaluation engine with configurable rules"],
approach:"Architecture: Agents (push metrics) → Ingestion Layer (Kafka) → Time-Series DB (columnar storage, downsampling) → Query Engine → Dashboard + Alert Evaluator. Key decisions: (1) Pull (Prometheus) vs Push (Datadog) model, (2) Downsampling: keep 1s resolution for 24h, 1m for 30d, 1h for 1y, (3) Alert evaluation: sliding window checks every interval, (4) Anomaly detection: statistical (z-score) or ML-based.",
companies:["Google","Amazon","Netflix"]},
{id:"d17c6",category:"ds",difficulty:"medium",title:"Implement BitSet",
description:"Implement a BitSet data structure supporting: set(i), clear(i), get(i), flip(i), and cardinality() (count of set bits) — all in O(1) except cardinality in O(n/64).",
hints:["Use long[] array where each long holds 64 bits","Bit index: arrayIndex = i / 64, bitIndex = i % 64","Use bitwise OR to set, AND with NOT to clear"],
approach:"Store bits in long[] array. Each long = 64 bits. set: words[i/64] |= (1L << (i%64)). clear: words[i/64] &= ~(1L << (i%64)). get: (words[i/64] >> (i%64)) & 1. cardinality: sum Long.bitCount() across all words.",
code:`public class BitSet {
    private long[] words;
    private int size;
    
    public BitSet(int nbits) {
        this.size = nbits;
        this.words = new long[(nbits + 63) / 64];
    }
    
    public void set(int i) { words[i >> 6] |= (1L << i); }
    public void clear(int i) { words[i >> 6] &= ~(1L << i); }
    public boolean get(int i) { return (words[i >> 6] & (1L << i)) != 0; }
    public void flip(int i) { words[i >> 6] ^= (1L << i); }
    
    public int cardinality() {
        int count = 0;
        for (long w : words) count += Long.bitCount(w);
        return count;
    }
    
    public void and(BitSet other) {
        for (int i = 0; i < Math.min(words.length, other.words.length); i++)
            words[i] &= other.words[i];
    }
    
    public void or(BitSet other) {
        for (int i = 0; i < Math.min(words.length, other.words.length); i++)
            words[i] |= other.words[i];
    }
}`,companies:["Amazon","Google"]},
{id:"d17c7",category:"lead",difficulty:"medium",title:"How do you balance speed vs quality?",
description:"When there's pressure to ship fast but you know corners are being cut, how do you make the trade-off decision?",
hints:["Define what 'quality' means in THIS context","Make trade-offs explicit and documented","Tech debt register — conscious debt vs accidental"],
approach:"STAR: Describe a specific speed vs quality tension. Show your framework: (1) Assess blast radius — what breaks if it's buggy? (2) Identify mandatory quality bars (security, data integrity) vs nice-to-haves (code elegance), (3) Create conscious tech debt tickets with payback timeline, (4) Communicate trade-offs to stakeholders transparently. The answer should show you're NOT dogmatic about either extreme.",
companies:["All companies"]}
]};

// Day 18
const day18idx = DAYS_DATA.findIndex(d => d.day === 18);
if (day18idx !== -1) DAYS_DATA[day18idx] = {day:18,title:"Intervals & Line Sweep, Memento Pattern & Inventory",challenges:[
{id:"d18c1",category:"dsa",difficulty:"medium",title:"Merge Intervals",
description:"Given an array of intervals [start, end], merge all overlapping intervals and return non-overlapping intervals.",
hints:["Sort intervals by start time","If current interval overlaps with previous, merge them","Track the end of the merged interval"],
approach:"Sort by start. Initialize result with first interval. For each subsequent interval: if start <= result.last.end, merge (extend end). Otherwise add as new interval. O(n log n) sort + O(n) scan.",
code:`public int[][] merge(int[][] intervals) {
    Arrays.sort(intervals, (a, b) -> a[0] - b[0]);
    List<int[]> merged = new ArrayList<>();
    merged.add(intervals[0]);
    for (int i = 1; i < intervals.length; i++) {
        int[] last = merged.get(merged.size() - 1);
        if (intervals[i][0] <= last[1]) {
            last[1] = Math.max(last[1], intervals[i][1]);
        } else {
            merged.add(intervals[i]);
        }
    }
    return merged.toArray(new int[0][]);
}`,companies:["Amazon","Google","Meta","Microsoft"]},
{id:"d18c2",category:"dsa",difficulty:"medium",title:"Insert Interval",
description:"Given a sorted list of non-overlapping intervals, insert a new interval (merge if necessary) and return the result.",
hints:["Three phases: before overlap, during overlap, after overlap","During overlap, merge by extending boundaries","Handle edge cases: insert at beginning/end"],
approach:"Iterate: (1) Add all intervals ending before newInterval starts, (2) Merge all overlapping intervals with newInterval, (3) Add remaining. O(n) time.",
code:`public int[][] insert(int[][] intervals, int[] newInterval) {
    List<int[]> result = new ArrayList<>();
    int i = 0, n = intervals.length;
    // Before overlap
    while (i < n && intervals[i][1] < newInterval[0])
        result.add(intervals[i++]);
    // Merge overlapping
    while (i < n && intervals[i][0] <= newInterval[1]) {
        newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
        newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
        i++;
    }
    result.add(newInterval);
    // After overlap
    while (i < n) result.add(intervals[i++]);
    return result.toArray(new int[0][]);
}`,companies:["Google","Amazon","Meta"]},
{id:"d18c3",category:"dsa",difficulty:"hard",title:"Meeting Rooms II (Line Sweep + Min Heap)",
description:"Given meeting intervals [start, end], find the minimum number of conference rooms required. This introduces the Line Sweep technique.",
hints:["Line Sweep: +1 at start, -1 at end, track max overlap","OR: Sort by start, use min-heap tracking end times","Min-heap approach: if earliest ending room is free, reuse it"],
approach:"Two approaches: (1) LINE SWEEP: Create events (+1 for start, -1 for end), sort, sweep to find max concurrent. (2) MIN-HEAP: Sort by start. Heap stores end times. For each meeting, if heap.peek() <= start, pop (reuse room). Push new end. Answer = heap.size(). Both O(n log n).",
code:`// Approach 1: Line Sweep (most elegant)
public int minMeetingRooms(int[][] intervals) {
    int[] starts = new int[intervals.length];
    int[] ends = new int[intervals.length];
    for (int i = 0; i < intervals.length; i++) {
        starts[i] = intervals[i][0];
        ends[i] = intervals[i][1];
    }
    Arrays.sort(starts); Arrays.sort(ends);
    int rooms = 0, endPtr = 0;
    for (int start : starts) {
        if (start < ends[endPtr]) rooms++;
        else endPtr++;
    }
    return rooms;
}

// Approach 2: Min-Heap
public int minMeetingRoomsHeap(int[][] intervals) {
    Arrays.sort(intervals, (a, b) -> a[0] - b[0]);
    PriorityQueue<Integer> heap = new PriorityQueue<>();
    for (int[] interval : intervals) {
        if (!heap.isEmpty() && heap.peek() <= interval[0])
            heap.poll();
        heap.offer(interval[1]);
    }
    return heap.size();
}`,companies:["Amazon","Google","Meta","Microsoft","Bloomberg"]},
{id:"d18c4",category:"lld",difficulty:"medium",title:"Snapshot/Undo with Memento Pattern",
description:"Design a text editor with undo/redo functionality using the Memento pattern. Support: type(text), delete(n), undo(), redo().",
hints:["Memento stores the complete state snapshot","Caretaker (history) manages the stack of mementos","Originator creates and restores from mementos"],
approach:"Originator (TextEditor) creates Memento (state snapshot) before each operation. Caretaker maintains undo/redo stacks. undo() restores from undo stack, pushes current to redo stack. redo() does the reverse.",
code:`// Memento — immutable state snapshot
class EditorMemento {
    private final String content;
    private final int cursorPos;
    EditorMemento(String content, int cursorPos) {
        this.content = content; this.cursorPos = cursorPos;
    }
    String getContent() { return content; }
    int getCursorPos() { return cursorPos; }
}

// Originator
class TextEditor {
    private StringBuilder content = new StringBuilder();
    private int cursorPos = 0;
    
    public EditorMemento save() { return new EditorMemento(content.toString(), cursorPos); }
    public void restore(EditorMemento m) { content = new StringBuilder(m.getContent()); cursorPos = m.getCursorPos(); }
    
    public void type(String text) { content.insert(cursorPos, text); cursorPos += text.length(); }
    public void delete(int n) {
        int start = Math.max(0, cursorPos - n);
        content.delete(start, cursorPos); cursorPos = start;
    }
    public String getContent() { return content.toString(); }
}

// Caretaker
class EditorHistory {
    private final Deque<EditorMemento> undoStack = new ArrayDeque<>();
    private final Deque<EditorMemento> redoStack = new ArrayDeque<>();
    private final TextEditor editor;
    
    public EditorHistory(TextEditor editor) { this.editor = editor; }
    
    public void execute(Runnable operation) {
        undoStack.push(editor.save());
        redoStack.clear();
        operation.run();
    }
    
    public void undo() {
        if (undoStack.isEmpty()) return;
        redoStack.push(editor.save());
        editor.restore(undoStack.pop());
    }
    
    public void redo() {
        if (redoStack.isEmpty()) return;
        undoStack.push(editor.save());
        editor.restore(redoStack.pop());
    }
}`,companies:["Amazon","Google","Adobe"]},
{id:"d18c5",category:"hld",difficulty:"hard",title:"Design Inventory Management at Scale",
description:"Design an inventory system for an e-commerce platform handling 100K+ SKUs, real-time stock updates, and flash sale scenarios with 50K concurrent requests.",
hints:["Eventual consistency vs strong consistency for stock counts","Optimistic locking with version numbers","Reserve → Confirm → Release pattern for checkout flow"],
approach:"Architecture: API → Inventory Service → Redis (hot stock cache) + PostgreSQL (source of truth). Flash sales: Pre-warm Redis, use Lua scripts for atomic decrement, reservation pattern (hold stock for 10 min during checkout). Key patterns: (1) Optimistic locking (version column) to prevent overselling, (2) Event-driven sync between cache and DB, (3) Circuit breaker for downstream failures, (4) Sharding by product_id for horizontal scale.",
companies:["Amazon","Flipkart","Walmart"]},
{id:"d18c6",category:"ds",difficulty:"medium",title:"Implement Interval Tree",
description:"Implement an Interval Tree that supports: insert(interval), delete(interval), and findOverlapping(interval) — finding all intervals that overlap with a query.",
hints:["Each node stores an interval and max endpoint in subtree","BST ordered by interval start","To search: check overlap, then decide left/right using max"],
approach:"Augmented BST: each node has interval [lo, hi] + maxEnd (max hi in subtree). Insert: BST by lo, update maxEnd up. Search overlap: if node overlaps query, add it. If left.maxEnd >= query.lo, go left. Always go right if possible. O(log n + k) for k results.",
code:`public class IntervalTree {
    private class Node {
        int lo, hi, maxEnd;
        Node left, right;
        Node(int lo, int hi) { this.lo = lo; this.hi = hi; this.maxEnd = hi; }
    }
    private Node root;
    
    public void insert(int lo, int hi) { root = insert(root, lo, hi); }
    private Node insert(Node node, int lo, int hi) {
        if (node == null) return new Node(lo, hi);
        if (lo < node.lo) node.left = insert(node.left, lo, hi);
        else node.right = insert(node.right, lo, hi);
        node.maxEnd = Math.max(node.maxEnd, hi);
        return node;
    }
    
    public List<int[]> findOverlapping(int lo, int hi) {
        List<int[]> result = new ArrayList<>();
        search(root, lo, hi, result);
        return result;
    }
    private void search(Node node, int lo, int hi, List<int[]> result) {
        if (node == null) return;
        if (node.lo <= hi && lo <= node.hi)
            result.add(new int[]{node.lo, node.hi});
        if (node.left != null && node.left.maxEnd >= lo)
            search(node.left, lo, hi, result);
        search(node.right, lo, hi, result);
    }
}`,companies:["Google","Amazon"]},
{id:"d18c7",category:"lead",difficulty:"medium",title:"How do you onboard new team members effectively?",
description:"Describe your approach to onboarding a new engineer who needs to be productive within 30 days.",
hints:["30-60-90 day plan","Buddy system + documentation","First PR within week 1 builds confidence"],
approach:"Framework: Week 1 — Environment setup + first small PR (builds confidence), assign a buddy. Week 2-3 — Pair programming on medium tasks, architecture walkthrough. Week 4 — Independent feature with code review. Key principles: (1) Written onboarding doc (reduces tribal knowledge), (2) Starter tasks curated by difficulty, (3) 1-on-1s twice/week initially, (4) Clear expectations document. Metric: time-to-first-meaningful-PR.",
companies:["All companies"]}
]};

})();
