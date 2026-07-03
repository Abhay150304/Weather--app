public class arraysort {
    public static void main(String[] args) {
               
     
     int arr1[]={1,2,5,8,9};
     boolean isSorted= true;
       
      for(int i=0; i<arr1.length-1; i++){
        if(arr1[i] > arr1[i+1]){
            isSorted=false;
            break;
        }
    }
        if(isSorted){
            System.out.println("array sorted");
        }
        else{
            System.out.println("array not sorted");
        }
      }

    
    
}
