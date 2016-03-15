class HelloWorld {
    private nombre: string;
    private colab = new Colab("algo de texto")
    
    constructor() {
        this.nombre = "algo";
        this.colab.aMethod(this.nombre);
    }
    
    /*
     esto parece que funciona sin problemas....
    */
}
