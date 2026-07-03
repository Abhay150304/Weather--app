import java.util.HashMap;

public class Hashmap1 {
    public static void main(String[] args) {
       HashMap<String, Integer> h1 = new HashMap<>();
      h1.put("Distinction", 0);
      h1.put("pass", 0);
      h1.put("fail", 0);

      int[] marks = {22,19,33,40,90,83,32,75};

      for(int i=0; i<marks.length; i++){

        if(marks[i]>=75){
            int count = h1.get("Distinction");
            count++;
            h1.put("Distinction", count);
        }

        else if(marks[i]>= 33 && marks[i]<75){
            int count = h1.get("pass");
            count++;
            h1.put("pass", count);

        }
        else if (marks[i]< 33){
            int count = h1.get("fail");
            count++;
            h1.put("fail", count);
        }
      }
     System.out.println(h1);



    }
    
}
