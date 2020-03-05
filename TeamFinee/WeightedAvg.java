import java.util.Scanner;
public class WeightedAvg{
    public static void main(String [] args){
        Scanner input = new Scanner(System.in);

        System.out.println("Enter three number and weight pairs:");

        String [] pair_arr;

        for (int i = 0; i<3; i++){
            String nr_inp = input.nextLine();
            String [] pair = nr_inp.split("\\s*");
            pair_arr.append(pair);
        }

        System.out.println(pair_arr);
    }
}
