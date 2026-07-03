
import java.util.Scanner;
public class Anagram {
      
      public static void main(String[] args){
        
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter first string: ");
        String s1 = sc.nextLine().toLowerCase()
        //String s1 = "listen";

        System.out.print("Enter first string: ");
        String s2 = sc.nextLine().toLowerCase()
      //   String s2 = "silent";

        if (s1.length() != s2.length()) {
            System.out.println("Not an Anagram");
            return;
        }

        int[] count = new int[256];

        for (int i = 0; i < s1.length(); i++) {
            count[s1.charAt(i)]++;
            count[s2.charAt(i)]--;
        }

        for (int i = 0; i < 256; i++) {
            if (count[i] != 0) {
                System.out.println("Not an Anagram");
                return;
            }
        }

        System.out.println("Anagram");
    }
 }

 