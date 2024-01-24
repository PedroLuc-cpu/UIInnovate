import { z } from 'zod'
import { Button } from '../../components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../components/ui/form'
import { Input } from '../../components/ui/input'
import { PageLayout } from '../../layout/PageLayout'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { PersonService } from '../../services/api/persons/PersonServices'
import { useForm } from 'react-hook-form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select'

const formSchema = z.object({
  name: z.string().min(2).max(50),
  salary: z.number().min(1).max(100),
  approved: z.boolean(),
  sexy: z.string().min(1).max(100),
})

const sexo = [
  { label: 'masculino', value: 'masculino' },
  { label: 'feminino', value: 'feminino' },
] as const

const selecaoAprovacao = [
  { label: 'Aprovado', value: 'Aprovado' },
  { label: 'Reprovado', value: 'Reprovado' },
] as const

function CadastrarFuncionarios() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      salary: 0,
    },
  })

  const [name, setName] = useState('')
  const [salary, setSalary] = useState('')
  const [approved, setApproved] = useState(false)
  const [sexy, setSexy] = useState('')

  const handleSave = () => {
    PersonService.createPerson(name, salary, approved, sexy)
      .then(() => {})
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <PageLayout title="Cadastrar Funcionarios">
      <Form {...form}>
        <form className="p-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="digite aqui"
                    onChange={(e) => setName(e.target.value)}
                    name="name"
                    value={name}
                  />
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
                  <Input
                    {...field}
                    type="number"
                    placeholder="digite aqui"
                    name="salary"
                    onChange={(e) => setSalary(e.target.value)}
                    value={salary}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-4 pt-2">
            <Select
              onValueChange={(e) => {
                setApproved(e.valueOf() === 'Aprovado')
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Avaliação" />
              </SelectTrigger>
              <SelectContent>
                {selecaoAprovacao.map((item, index) => (
                  <SelectItem key={index} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select onValueChange={(e) => setSexy(e.valueOf())}>
              <SelectTrigger>
                <SelectValue placeholder="Escolha o sexo" />
              </SelectTrigger>
              <SelectContent>
                {sexo.map((item, index) => (
                  <SelectItem key={index} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2 pt-2">
            <Button onClick={() => handleSave()}>Cadastrar</Button>
            <Button variant={'destructive'}>Limpar</Button>
          </div>
        </form>
      </Form>
    </PageLayout>
  )
}

export default CadastrarFuncionarios
