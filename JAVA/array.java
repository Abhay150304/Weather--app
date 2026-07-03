import java.util.Arrays;

public class array {
    public static void main(String[] args) {
        int arr[]={1,2,5,6,10,15,40,20};
        int min=arr[0];
        int max=arr[0];
        int max2=arr[0];
         
          for (int i = 1; i < arr.length; i++) {
            if (arr[i] < min) {
                min = arr[i];
            }
            if (arr[i] > max) {
                max = arr[i];
            }
            if (arr[i] > max) {
                max2 = max;
                max = arr[i];
            } 
            else if (arr[i] < max && arr[i] > max2) {
                max2 = arr[i];
            }
        }

        System.out.println("Min = " + min);
        System.out.println("Max = " + max);
       System.out.println("Max2 = " + max2);
       
       
       
       
       
        // //Array Min and Max
        // Arrays.sort(arr1);
        //    System.out.println("Min = " + arr1[0]);
        //    System.out.println("Max = " + arr1[arr1.length - 1]);
        // //Array traversing
        // for(int i=0; i<arr1.length;  i++){
        //     System.out.print(+ arr1[i]+" ");
        // }
    }
}
