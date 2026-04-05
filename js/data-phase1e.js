// ═══ ENRICHED PHASE 1E: Days 19-20 (Full Solutions) ═══
(function() {

const day19idx = DAYS_DATA.findIndex(d => d.day === 19);
if (day19idx !== -1) DAYS_DATA[day19idx] = {day:19,title:"Matrix Problems, Visitor Pattern & E-commerce",challenges:[
{id:"d19c1",category:"dsa",difficulty:"medium",title:"Rotate Image",
description:"Rotate an n×n 2D matrix 90 degrees clockwise IN-PLACE. Do not allocate another matrix.",
hints:["Step 1: Transpose the matrix (swap rows and columns)","Step 2: Reverse each row","This two-step approach avoids extra space"],
approach:"Two-step in-place: (1) Transpose: swap matrix[i][j] with matrix[j][i]. (2) Reverse each row. For counter-clockwise: reverse each row first, then transpose. O(n²) time, O(1) space.",
code:`public void rotate(int[][] matrix) {
    int n = matrix.length;
    // Step 1: Transpose
    for (int i = 0; i < n; i++)
        for (int j = i + 1; j < n; j++) {
            int temp = matrix[i][j];
            matrix[i][j] = matrix[j][i];
            matrix[j][i] = temp;
        }
    // Step 2: Reverse each row
    for (int i = 0; i < n; i++)
        for (int j = 0; j < n / 2; j++) {
            int temp = matrix[i][j];
            matrix[i][j] = matrix[i][n - 1 - j];
            matrix[i][n - 1 - j] = temp;
        }
}`,companies:["Amazon","Google","Microsoft","Apple"]},
{id:"d19c2",category:"dsa",difficulty:"medium",title:"Spiral Matrix",
description:"Given an m×n matrix, return all elements in spiral order (right → down → left → up → repeat).",
hints:["Track four boundaries: top, bottom, left, right","Shrink boundaries after traversing each edge","Watch for edge cases: single row/column"],
approach:"Maintain 4 boundaries. Traverse: left→right (top row, top++), top→bottom (right col, right--), right→left (bottom row, bottom--), bottom→top (left col, left++). Stop when boundaries cross.",
code:`public List<Integer> spiralOrder(int[][] matrix) {
    List<Integer> result = new ArrayList<>();
    int top = 0, bottom = matrix.length - 1;
    int left = 0, right = matrix[0].length - 1;
    
    while (top <= bottom && left <= right) {
        for (int j = left; j <= right; j++) result.add(matrix[top][j]);
        top++;
        for (int i = top; i <= bottom; i++) result.add(matrix[i][right]);
        right--;
        if (top <= bottom) {
            for (int j = right; j >= left; j--) result.add(matrix[bottom][j]);
            bottom--;
        }
        if (left <= right) {
            for (int i = bottom; i >= top; i--) result.add(matrix[i][left]);
            left++;
        }
    }
    return result;
}`,companies:["Amazon","Google","Meta","Microsoft"]},
{id:"d19c3",category:"dsa",difficulty:"medium",title:"Set Matrix Zeroes",
description:"Given an m×n matrix, if an element is 0, set its entire row and column to 0. Do it IN-PLACE with O(1) extra space.",
hints:["Use first row and first column as markers","Need special handling for first row/col themselves","Process from bottom-right to avoid overwriting markers"],
approach:"Use matrix[0][j] and matrix[i][0] as markers. First pass: mark rows/cols that need zeroing. Second pass (reverse): zero based on markers. Handle first row/col separately with boolean flags. O(mn) time, O(1) space.",
code:`public void setZeroes(int[][] matrix) {
    int m = matrix.length, n = matrix[0].length;
    boolean firstRowZero = false, firstColZero = false;
    
    // Check if first row/col should be zero
    for (int j = 0; j < n; j++) if (matrix[0][j] == 0) firstRowZero = true;
    for (int i = 0; i < m; i++) if (matrix[i][0] == 0) firstColZero = true;
    
    // Use first row/col as markers
    for (int i = 1; i < m; i++)
        for (int j = 1; j < n; j++)
            if (matrix[i][j] == 0) {
                matrix[i][0] = 0;
                matrix[0][j] = 0;
            }
    
    // Zero based on markers (process from inside out)
    for (int i = 1; i < m; i++)
        for (int j = 1; j < n; j++)
            if (matrix[i][0] == 0 || matrix[0][j] == 0)
                matrix[i][j] = 0;
    
    if (firstRowZero) for (int j = 0; j < n; j++) matrix[0][j] = 0;
    if (firstColZero) for (int i = 0; i < m; i++) matrix[i][0] = 0;
}`,companies:["Amazon","Google","Meta"]},
{id:"d19c4",category:"lld",difficulty:"medium",title:"Operations on Shape Hierarchy — Visitor Pattern",
description:"Design a shape system (Circle, Rectangle, Triangle) where you can add new operations (area, perimeter, draw, serialize) WITHOUT modifying shape classes.",
hints:["Visitor pattern separates algorithms from object structure","Each shape accepts a visitor: shape.accept(visitor)","New operations = new Visitor implementations"],
approach:"Double dispatch: Shape.accept(Visitor) calls visitor.visit(this). Each new operation (AreaCalc, Perimeter, JSONSerializer) is a new Visitor class. Adding new operations doesn't touch Shape classes — Open/Closed Principle.",
code:`// Element hierarchy
interface Shape { void accept(ShapeVisitor visitor); }

class Circle implements Shape {
    double radius;
    Circle(double r) { this.radius = r; }
    public void accept(ShapeVisitor v) { v.visit(this); }
}
class Rectangle implements Shape {
    double width, height;
    Rectangle(double w, double h) { width = w; height = h; }
    public void accept(ShapeVisitor v) { v.visit(this); }
}

// Visitor interface
interface ShapeVisitor {
    void visit(Circle c);
    void visit(Rectangle r);
}

// Concrete Visitors — add operations without modifying shapes!
class AreaCalculator implements ShapeVisitor {
    double totalArea = 0;
    public void visit(Circle c) { totalArea += Math.PI * c.radius * c.radius; }
    public void visit(Rectangle r) { totalArea += r.width * r.height; }
}

class JsonSerializer implements ShapeVisitor {
    StringBuilder json = new StringBuilder("[");
    public void visit(Circle c) { 
        json.append("{\\"type\\":\\"circle\\",\\"radius\\":").append(c.radius).append("},"); 
    }
    public void visit(Rectangle r) { 
        json.append("{\\"type\\":\\"rect\\",\\"w\\":").append(r.width)
            .append(",\\"h\\":").append(r.height).append("},"); 
    }
}`,companies:["Amazon","Adobe","Flipkart"]},
{id:"d19c5",category:"hld",difficulty:"hard",title:"Design E-commerce Product Catalog",
description:"Design a product catalog for Amazon-scale: 500M+ products, faceted search, real-time inventory, personalized recommendations, and multi-language support.",
hints:["Search: ElasticSearch for faceted search + autocomplete","Catalog as microservice with read replicas","CDN for product images, separate media service"],
approach:"Architecture: Product Service (CRUD) → ElasticSearch (search/filter) → Redis (trending/cache) → CDN (images). Key decisions: (1) CQRS: separate write (PostgreSQL) and read (ES, Redis) models, (2) Faceted search: ES aggregations for filters, (3) Catalog ingestion pipeline for seller uploads, (4) Multi-language: i18n table with locale-based joins, (5) Cache strategy: product page = Redis, search = ES, images = CDN with versioning.",
companies:["Amazon","Flipkart","Walmart"]},
{id:"d19c6",category:"ds",difficulty:"medium",title:"Implement Sparse Matrix",
description:"Implement a Sparse Matrix that efficiently stores matrices where >80% elements are zero. Support: get(i,j), set(i,j,v), multiply(other), transpose().",
hints:["Use HashMap<Integer, HashMap<Integer, Double>> or compressed sparse row (CSR)","CSR: values[], colIndices[], rowPointers[]","Matrix multiply only processes non-zero elements"],
approach:"Two representations: (1) Dictionary of Keys: Map<(row,col), value>. Good for construction. (2) CSR (Compressed Sparse Row): three arrays — values, colIndices, rowPointers. Good for arithmetic. Multiply: only iterate non-zero elements, skip entire zero rows.",
code:`public class SparseMatrix {
    // CSR format
    private double[] values;
    private int[] colIndices;
    private int[] rowPointers;
    private int rows, cols;
    
    // Build from map
    public SparseMatrix(int rows, int cols, Map<Integer, Map<Integer, Double>> data) {
        this.rows = rows; this.cols = cols;
        List<Double> vals = new ArrayList<>();
        List<Integer> colIdx = new ArrayList<>();
        rowPointers = new int[rows + 1];
        
        for (int i = 0; i < rows; i++) {
            rowPointers[i] = vals.size();
            if (data.containsKey(i)) {
                Map<Integer, Double> row = data.get(i);
                for (var e : new TreeMap<>(row).entrySet()) {
                    vals.add(e.getValue());
                    colIdx.add(e.getKey());
                }
            }
        }
        rowPointers[rows] = vals.size();
        values = vals.stream().mapToDouble(Double::doubleValue).toArray();
        colIndices = colIdx.stream().mapToInt(Integer::intValue).toArray();
    }
    
    public double get(int i, int j) {
        for (int k = rowPointers[i]; k < rowPointers[i + 1]; k++)
            if (colIndices[k] == j) return values[k];
        return 0.0;
    }
    
    // Multiply: only processes non-zero elements
    public SparseMatrix multiply(SparseMatrix B) {
        Map<Integer, Map<Integer, Double>> result = new HashMap<>();
        for (int i = 0; i < rows; i++) {
            for (int k = rowPointers[i]; k < rowPointers[i+1]; k++) {
                int colA = colIndices[k];
                double valA = values[k];
                for (int l = B.rowPointers[colA]; l < B.rowPointers[colA+1]; l++) {
                    int colB = B.colIndices[l];
                    result.computeIfAbsent(i, x -> new HashMap<>())
                          .merge(colB, valA * B.values[l], Double::sum);
                }
            }
        }
        return new SparseMatrix(rows, B.cols, result);
    }
}`,companies:["Google","Amazon"]},
{id:"d19c7",category:"lead",difficulty:"medium",title:"Describe a time you improved team velocity by 2x",
description:"Share a concrete example where you identified bottlenecks in your team's delivery process and took actions that measurably improved throughput.",
hints:["Quantify: sprint velocity, cycle time, deployment frequency","Common bottlenecks: code review, testing, deployments, unclear requirements","Show systematic thinking, not just 'we worked harder'"],
approach:"STAR with metrics: Situation — team was delivering X story points/sprint. Task — improve delivery without adding headcount. Action — (1) Identified bottleneck (e.g., code reviews taking 2+ days), (2) Introduced specific changes (PR size limits, async reviews, CI/CD improvements, testing automation), (3) Measured impact. Result — velocity increased from X to 2X, cycle time dropped from Y to Y/2. Key: show SYSTEMIC improvements, not just firefighting.",
companies:["All companies"]}
]};

const day20idx = DAYS_DATA.findIndex(d => d.day === 20);
if (day20idx !== -1) DAYS_DATA[day20idx] = {day:20,title:"Prefix Sum, Specification Pattern & Data Pipeline",challenges:[
{id:"d20c1",category:"dsa",difficulty:"medium",title:"Subarray Sum Equals K",
description:"Given an integer array nums and an integer k, return the total number of subarrays whose sum equals k.",
hints:["Prefix sum: sum[0..j] - sum[0..i] = sum[i+1..j]","Use HashMap to store frequency of each prefix sum","If prefixSum - k exists in map, those are valid subarrays"],
approach:"HashMap stores count of each prefix sum seen so far. For current prefixSum, if (prefixSum - k) exists in map, add its count to result. This handles negative numbers correctly (unlike sliding window). O(n) time, O(n) space.",
code:`public int subarraySum(int[] nums, int k) {
    Map<Integer, Integer> prefixCount = new HashMap<>();
    prefixCount.put(0, 1); // empty prefix
    int sum = 0, count = 0;
    
    for (int num : nums) {
        sum += num;
        count += prefixCount.getOrDefault(sum - k, 0);
        prefixCount.merge(sum, 1, Integer::sum);
    }
    return count;
}`,companies:["Amazon","Google","Meta","Microsoft"]},
{id:"d20c2",category:"dsa",difficulty:"medium",title:"Range Sum Query — Immutable",
description:"Given an integer array nums, handle multiple queries sumRange(left, right) returning the sum of elements between indices left and right inclusive.",
hints:["Precompute prefix sum array","sumRange(l,r) = prefix[r+1] - prefix[l]","O(1) per query after O(n) preprocessing"],
approach:"Build prefix sum array where prefix[i] = sum of nums[0..i-1]. Then sumRange(l,r) = prefix[r+1] - prefix[l]. Preprocessing: O(n). Each query: O(1). This is the foundation pattern for many advanced problems.",
code:`class NumArray {
    private int[] prefix;
    
    public NumArray(int[] nums) {
        prefix = new int[nums.length + 1];
        for (int i = 0; i < nums.length; i++)
            prefix[i + 1] = prefix[i] + nums[i];
    }
    
    public int sumRange(int left, int right) {
        return prefix[right + 1] - prefix[left];
    }
}

// 2D version: immutable range sum query
class NumMatrix {
    private int[][] prefix;
    
    public NumMatrix(int[][] matrix) {
        int m = matrix.length, n = matrix[0].length;
        prefix = new int[m + 1][n + 1];
        for (int i = 1; i <= m; i++)
            for (int j = 1; j <= n; j++)
                prefix[i][j] = matrix[i-1][j-1] + prefix[i-1][j] 
                    + prefix[i][j-1] - prefix[i-1][j-1];
    }
    
    public int sumRegion(int r1, int c1, int r2, int c2) {
        return prefix[r2+1][c2+1] - prefix[r1][c2+1] 
             - prefix[r2+1][c1] + prefix[r1][c1];
    }
}`,companies:["Amazon","Google","Bloomberg"]},
{id:"d20c3",category:"dsa",difficulty:"medium",title:"Contiguous Array (Longest Subarray with Equal 0s and 1s)",
description:"Given a binary array nums, find the maximum length of a contiguous subarray with an equal number of 0s and 1s.",
hints:["Convert 0s to -1s, then find longest subarray with sum 0","This becomes a prefix sum + HashMap problem","Store first occurrence of each prefix sum"],
approach:"Transform: treat 0 as -1. Now find longest subarray with sum=0. Use prefix sum + HashMap storing first index of each cumulative sum. When same sum appears again, the subarray between has equal 0s and 1s. O(n) time.",
code:`public int findMaxLength(int[] nums) {
    Map<Integer, Integer> firstSeen = new HashMap<>();
    firstSeen.put(0, -1); // base case
    int sum = 0, maxLen = 0;
    
    for (int i = 0; i < nums.length; i++) {
        sum += (nums[i] == 0) ? -1 : 1;
        if (firstSeen.containsKey(sum)) {
            maxLen = Math.max(maxLen, i - firstSeen.get(sum));
        } else {
            firstSeen.put(sum, i);
        }
    }
    return maxLen;
}`,companies:["Amazon","Google","Meta"]},
{id:"d20c4",category:"lld",difficulty:"medium",title:"Flexible Business Rules — Specification Pattern",
description:"Design a product filtering system where rules can be combined with AND/OR/NOT logic. Rules should be composable and extensible without modifying existing code.",
hints:["Each Specification has isSatisfiedBy(item) method","AndSpecification, OrSpecification, NotSpecification compose specs","New filters = new Specification classes, no existing code changes"],
approach:"Specification pattern: each rule is a class with isSatisfiedBy(T). Combine using composite specs (And, Or, Not). This allows dynamically building complex filter expressions at runtime without modifying product or filter code.",
code:`// Base specification
interface Specification<T> {
    boolean isSatisfiedBy(T item);
    
    default Specification<T> and(Specification<T> other) {
        return item -> this.isSatisfiedBy(item) && other.isSatisfiedBy(item);
    }
    default Specification<T> or(Specification<T> other) {
        return item -> this.isSatisfiedBy(item) || other.isSatisfiedBy(item);
    }
    default Specification<T> not() {
        return item -> !this.isSatisfiedBy(item);
    }
}

// Concrete specifications
class PriceRangeSpec implements Specification<Product> {
    private double min, max;
    PriceRangeSpec(double min, double max) { this.min = min; this.max = max; }
    public boolean isSatisfiedBy(Product p) { return p.getPrice() >= min && p.getPrice() <= max; }
}

class CategorySpec implements Specification<Product> {
    private String category;
    CategorySpec(String cat) { this.category = cat; }
    public boolean isSatisfiedBy(Product p) { return p.getCategory().equals(category); }
}

class InStockSpec implements Specification<Product> {
    public boolean isSatisfiedBy(Product p) { return p.getStock() > 0; }
}

// Usage — composable, readable, extensible
Specification<Product> filter = new PriceRangeSpec(100, 500)
    .and(new CategorySpec("Electronics"))
    .and(new InStockSpec());
    
List<Product> results = products.stream()
    .filter(filter::isSatisfiedBy)
    .collect(Collectors.toList());`,companies:["Amazon","Flipkart","Uber"]},
{id:"d20c5",category:"hld",difficulty:"hard",title:"Design Real-time Data Pipeline (Kafka + Flink)",
description:"Design a real-time data pipeline processing 1M+ events/sec. Support: ingestion, transformation, aggregation, alerting, and storage for analytics.",
hints:["Kafka for ingestion + buffering","Stream processing: Flink/Spark Streaming for transformations","Lambda architecture: real-time + batch layers"],
approach:"Architecture: Producers → Kafka (ingestion, partitioned by key) → Flink (stream processing: filter, transform, aggregate, windowing) → Sinks (Elasticsearch for search, ClickHouse for analytics, S3 for archive). Key decisions: (1) Exactly-once semantics: Kafka transactions + Flink checkpointing, (2) Late data: watermarks + allowed lateness, (3) Windowing: tumbling (fixed), sliding, session windows, (4) Backpressure: Flink handles natively, Kafka consumer groups scale horizontally.",
companies:["Google","Amazon","Netflix","Uber"]},
{id:"d20c6",category:"ds",difficulty:"medium",title:"Implement Fenwick Tree (Binary Indexed Tree)",
description:"Implement a Fenwick Tree supporting point update and prefix sum query in O(log n). More space-efficient than Segment Tree.",
hints:["BIT uses 1-indexed array","update: traverse up using i += i & (-i)","query: traverse down using i -= i & (-i)"],
approach:"Core insight: i & (-i) gives the lowest set bit. Update cascades up, query cascades down. Each element is responsible for a range of size = lowest set bit of its index. O(log n) for both operations.",
code:`public class FenwickTree {
    private int[] tree;
    private int n;
    
    public FenwickTree(int n) {
        this.n = n;
        this.tree = new int[n + 1]; // 1-indexed
    }
    
    // Add delta to index i (0-indexed input)
    public void update(int i, int delta) {
        i++; // convert to 1-indexed
        while (i <= n) {
            tree[i] += delta;
            i += i & (-i); // move to parent
        }
    }
    
    // Sum of [0, i] (0-indexed input)
    public int prefixSum(int i) {
        i++; // convert to 1-indexed
        int sum = 0;
        while (i > 0) {
            sum += tree[i];
            i -= i & (-i); // move to responsible ancestor
        }
        return sum;
    }
    
    // Sum of [left, right] (0-indexed)
    public int rangeSum(int left, int right) {
        return prefixSum(right) - (left > 0 ? prefixSum(left - 1) : 0);
    }
    
    // Build from array in O(n)
    public static FenwickTree buildFrom(int[] arr) {
        FenwickTree ft = new FenwickTree(arr.length);
        for (int i = 0; i < arr.length; i++) ft.update(i, arr[i]);
        return ft;
    }
}`,companies:["Google","Amazon","Microsoft"]},
{id:"d20c7",category:"lead",difficulty:"medium",title:"How do you handle scope creep?",
description:"Describe how you manage scope creep in a project — when requirements keep expanding mid-sprint or mid-quarter.",
hints:["Make scope visible: document what's in vs out","Impact analysis: show trade-offs of adding scope","Protect the team from context switching"],
approach:"STAR: Describe a project where scope kept expanding. Your framework: (1) Maintain a living scope document — any addition requires removing something OR extending timeline, (2) Impact analysis template: 'Adding X means delaying Y by Z days', (3) Weekly scope review with PM — make decisions explicit, (4) Shield team from ad-hoc requests through proper backlog grooming. Show you're collaborative (not just saying no) but firm on trade-offs.",
companies:["All companies"]}
]};

})();
