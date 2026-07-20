"use client";

import { Button } from "@/app/_components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogClose,
} from "@/app/_components/ui/dialog";
import { PlusIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import { NumericFormat } from "react-number-format";

const formSchema = z.object({
  // Nome do produto é uma string, onde deve ter pelomenos 1 caracter, juntamente com o trim para não aceitar espaços em branco, e a mensagem de erro caso não seja preenchido
  name: z
    .string()
    .trim()
    .min(1, { message: "O nome do produto é obrigatório." }),
  // Preço do produto é um número, onde deve ser maior que 0.01, e a mensagem de erro caso não seja preenchido
  price: z.number().min(0.01, { message: "O preço do produto é obrigatório." }),
  // Estoque do produto é um número inteiro, onde deve ser maior ou igual a 0, e a mensagem de erro caso não seja preenchido
  //   o corce converte para number e o positiive garante ser positivo, usado pois ha campos que recebe como string ou outro tipo
  stock: z
    .number()
    .positive({
      message: "Valor do estoque deve ser positiva.",
    })
    .int()
    .min(0, { message: "O estoque do produto é obrigatório." }),
});

type FormSchema = z.infer<typeof formSchema>;
const AddProductButton = () => {
  // Chamar o useForm do react-hook-form, passando o zodResolver para validar o formulário com o schema definido acima, e os valores padrões do formulário
  const form = useForm<FormSchema>({
    // shouldUnregister faz com que limpe os imputs quando fechar o modal
    shouldUnregister: true,
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      price: 0,
      stock: 1,
    },
  });

  const onSubmit = (data: FormSchema) => {
    console.log({ data });
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <PlusIcon size={20} />
          Novo Produto
        </Button>
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form
            id="form-rhf-demo"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            <DialogHeader>
              <DialogTitle>Criar Produto</DialogTitle>
              <DialogDescription>
                Insira as informações abaixo
              </DialogDescription>
            </DialogHeader>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do Produto</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Digite o nome do produto" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor do produto</FormLabel>
                  <FormControl>
                    {/* bilioteca react-number-format */}
                    <NumericFormat
                      thousandSeparator="."
                      decimalSeparator=","
                      fixedDecimalScale
                      decimalScale={2}
                      prefix="R$ "
                      allowNegative={false}
                      customInput={Input}
                      //   resolver problema do formato ser uma string mas é para receber um number
                      onValueChange={(values) =>
                        field.onChange(values.floatValue)
                      }
                      {...field}
                      onChange={() => {}}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="stock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estoque do produto</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      placeholder="Digite o estoque do produto"
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              {/* Como tem um button dentro de outro, colocar aschild */}
              <DialogClose asChild>
                <Button type="reset" variant="secondary">
                  Cancelar
                </Button>
              </DialogClose>
              <Button type="submit">Salvar</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddProductButton;
