import { z } from 'zod'
import { Button } from '../../components/ui/button'
import {  Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../../components/ui/form'
import { Input } from '../../components/ui/input'
import { PageLayout } from '../../layout/PageLayout'
import { zodResolver } from '@hookform/resolvers/zod'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '../../components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '../../components/ui/popover'
import { Check, ChevronsUpDown } from 'lucide-react'
import { cn } from '../../lib/utils'
import { useState } from 'react'
import { PersonService } from '../../services/api/persons/PersonServices'
import { useForm } from 'react-hook-form'


const formSchema = z.object({
    name: z.string().min(2).max(50),
    salary: z.number().min(1).max(100),
    approved: z.boolean(),
    sexy: z.string().min(1).max(100),
    })

    const sexo = [
        { label: "Masculino", value: "m" },
        { label: "Feminino", value: "f" },
    ] as const

    const selecaoAprovacao = [
        { label: "Aprovado", value: "a" },
        { label: "Reprovado", value: "r" },
    ] as const



function CadastrarFuncionarios() {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues:{
            name: "",
            salary: 0,
        }
    })

    const FormSchemaCombox = z.object({
        sexy: z.string({
            required_error: "Selecione seu sexo",
        }),
        })

        const FormSchemaComboxApproved = z.object({
            approved: z.string({
                required_error: "Selecione seu sexo",
            }),       
            })

    const comboxSexo = useForm<z.infer<typeof FormSchemaCombox>>({
        resolver: zodResolver(FormSchemaCombox),
    })      

    const comboxApproved = useForm<z.infer<typeof FormSchemaComboxApproved>>({
        resolver: zodResolver(FormSchemaComboxApproved),
    })

    const [name, setName] = useState("")
    const [salary, setSalary] = useState("")
    const [approved, setApproved] = useState(false)
    const [sexy, setSexy] = useState("masculino")

    
    // const {register, handleSubmit} = useForm<IPerson>()
    
    // const onSubmit : SubmitHandler<IPerson> = (data) => console.log(data)


    const handleSave = () => [
        PersonService.createPerson(name, salary, approved, sexy).then((result) => {
            console.log(result)
        })
    ]

    return (
        <PageLayout 
            title='Cadastrar Funcionarios'
        >
            <Form {...form}>
                <form className="p-2">
                    <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Nome</FormLabel>
                        <FormControl>
                            <Input {...field} placeholder='digite aqui' onChange={(e) => setName(e.target.value)} name='name' value={name}/>
                        </FormControl>
                        <FormDescription>
                            This is your public display name.
                        </FormDescription>
                        <FormMessage />
                        </FormItem>
                    )}
                    />

                    <FormField
                    control={form.control}
                    name="salary"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Salario</FormLabel>
                        <FormControl>
                            <Input {...field} type='number' placeholder='digite aqui' name='salary' onChange={(e) => setSalary(e.target.value)} value={salary}/>
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />

                <div className='flex pt-3'>
                <FormField
            control={comboxApproved.control}
            name="approved"
            render={({ field }) => (
            <FormItem className="flex flex-col">
                <FormLabel>Aprovação do funcionario</FormLabel>
                <Popover>
                <PopoverTrigger asChild>
                    <FormControl>
                    <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                        "w-[200px] justify-between",
                        !field.value && "text-muted-foreground"
                        )}
                    >
                        {field.value
                        ? selecaoAprovacao.find(
                            (language) => language.value === field.value
                            )?.label
                        : "Selecione sua aprovação"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                    </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                    <Command>
                    <CommandInput placeholder="Search language..." name='approved'/>
                    <CommandEmpty>No language found.</CommandEmpty>
                    <CommandGroup>
                        {selecaoAprovacao.map((aprovacao) => (
                            <CommandItem
                            value={aprovacao.label}
                            key={aprovacao.value}
                            onSelect={() => {
                                comboxApproved.setValue("approved", aprovacao.value)
                            }}
                            >
                            <Check
                                className={cn(
                                "mr-2 h-4 w-4",
                                aprovacao.value === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                            />
                            {aprovacao.label}
                        </CommandItem>
                        ))}
                    </CommandGroup>
                    </Command>
                </PopoverContent>
                </Popover>
                <FormDescription>
                This is the language that will be used in the dashboard.
                </FormDescription>
                <FormMessage />
            </FormItem>
            )}
        />
        <FormField
            control={comboxSexo.control}
            name="sexy"
            render={({ field }) => (
            <FormItem className="flex flex-col">
                <FormLabel>Sexo</FormLabel>
                <Popover>
                <PopoverTrigger asChild>
                    <FormControl>
                    <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                        "w-[200px] justify-between",
                        !field.value && "text-muted-foreground"
                        )}
                    >
                        {field.value
                        ? sexo.find(
                            (sexo) => sexo.value === field.value
                            )?.label
                        : "selecione o sexo"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                    </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                    <Command>
                    <CommandInput placeholder="Search language..." name='sexy'/>
                    <CommandEmpty>No language found.</CommandEmpty>
                    <CommandGroup>
                        {sexo.map((sexo) => (
                            <CommandItem
                            value={sexo.label}
                            key={sexo.value}
                            onSelect={() => {
                                comboxSexo.setValue("sexy", sexo.value)
                            }}
                            >
                            <Check
                                className={cn(
                                "mr-2 h-4 w-4",
                                sexo.value === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                            />
                            {sexo.label}
                        </CommandItem>
                        ))}
                    </CommandGroup>
                    </Command>
                </PopoverContent>
                </Popover>
                <FormDescription>
                This is the language that will be used in the dashboard.
                </FormDescription>
                <FormMessage />
            </FormItem>
            )}
        />
                </div>

                <div className='flex gap-2 pt-2'>
                <Button onClick={() => handleSave()}>Cadastrar</Button>
                <Button variant={"destructive"}>Limpar</Button>
                </div>
                </form>
            </Form>
        </PageLayout>
    )
}

export default CadastrarFuncionarios