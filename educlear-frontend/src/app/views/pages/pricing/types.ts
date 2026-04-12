export type PricingType = {
    name: string;
    description: string;
    price: number | string;
    paymentType: string;
    text: string;
    class :string;
    features: {
        icon: string;
        name: string;
        variant: string;
    }[];
    buttonText: string;
    buttonClass:string;
}