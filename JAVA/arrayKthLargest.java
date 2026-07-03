import java.util.Arrays;
import java.util.PriorityQueue;
public class arrayKthLargest {
    
    public static void main(String[] args) {
       int nums[]={1,3,5,4,6};
       int k =3;

       PriorityQueue<Integer>minHeap= new PriorityQueue<>();
       for(int num : nums){
        minHeap.offer(num);
        if(minHeap.size()>k){
            minHeap.poll();
        }

       }
          System.out.println(k+"th Largest Element: "+ minHeap.peek());
    }
}
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    //brotforce aproch
//     {
//         int nums[]={3,2,1,5,6,4};
//         int k = 2;
//         Arrays.sort(nums);
//         for(int i=0; i<nums.length; i++){
//             // System.out.print(nums[i]+" ");
//         }
//         System.out.println(k+"th largest element= " + nums[nums.length-k]);
//     }
    
// }
