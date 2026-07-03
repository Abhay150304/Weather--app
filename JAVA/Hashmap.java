import java.util.HashMap;

public class Hashmap {
    public static void main(String[] args) {

        HashMap<Integer, String> adhaarCardholders = new HashMap<>();

        adhaarCardholders.put(123, "mulesh@gmail.com");
        adhaarCardholders.put(1276, "rana@gmail.com");
        adhaarCardholders.put(123, "kumar@gmail.com"); // overwrite
        adhaarCardholders.put(2439, "rohit@gmail.com");
        adhaarCardholders.put(1276, "rana208@gmail.com"); // overwrite

        int len = adhaarCardholders.size();

        System.out.println( len);
        System.out.println (adhaarCardholders.get(1276));
    }
}