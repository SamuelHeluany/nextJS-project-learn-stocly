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
import { Loader2Icon, PlusIcon } from "lucide-react";
import { useForm } from "react-hook-form";
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
import { createProducts } from "@/app/_actions/create-product";
import { useState } from "react";
import {
  createProductSchema,
  CreateProductSchema,
} from "@/app/_actions/create-product/schema";

const CreateProductButton = () => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  // Chamar o useForm do react-hook-form, passando o zodResolver para validar o formulário com o schema definido acima, e os valores padrões do formulário
  const form = useForm<CreateProductSchema>({
    // shouldUnregister faz com que limpe os imputs quando fechar o modal
    shouldUnregister: true,
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      name: "",
      price: 0,
      stock: 1,
    },
  });

  const onSubmit = async (data: CreateProductSchema) => {
    try {
      await createProducts(data);
      setDialogIsOpen(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
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
              {/* Vai ser verdadeiro enquanto a server action estiver sendo executada, ou seja, a função submit ser executada */}
              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="gap-1.5"
              >
                {/* se estiver enviando a criação do produto, coloca um spin de carregamento */}
                {form.formState.isSubmitting && (
                  <Loader2Icon className="animate-spin" size={16} />
                )}
                Salvar
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProductButton;
