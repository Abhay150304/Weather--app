public class reverseInteger{
        public static void main(String[] args) {
            //int num=1234;
            //String str=String.valueOf(num);
           String name="Abhay";
           String rev = "";

                 for (int i = name.length() - 1; i >= 0; i--) {
                   rev = rev + name.charAt(i);
}
            //int num1 = Integer.valueOf(rev);
            System.out.println(rev);
        }

}
