import { useEffect, useState } from "react"
import { IPerson } from "../../model/Persons/person"
import { PersonService } from "../../services/api/persons/PersonServices";
import { PageLayout } from "../../layout/PageLayout";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Button } from "../../components/ui/button";



function ListarFuncionarios() {
    const [funcionarios, setFuncionarios] = useState<IPerson[]>([]);

    useEffect(() => {
        PersonService.getAll().then((result) => {
            if(result instanceof Error){
                alert(result.message)
            }else{
                setFuncionarios(result);
            }
        });
    }, [])

    return (
        <PageLayout
            title="Funcionarios"
        >
            <div>
            <div className="flex bg-slate-800 h-32 items-center p-2">
                <Label className="text-gray-200 flex gap-1">
                    Buscar por nome
                    <Input className="text-black"/>
                    <Button variant={"outline"} className="text-black">Buscar</Button>
                </Label>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="font-bold">Nome</TableHead>
                        <TableHead className="font-bold">Salário</TableHead>
                        <TableHead className="font-bold">Aprovação</TableHead>
                        <TableHead className="font-bold">Sexo</TableHead>
                    </TableRow>
                </TableHeader>
                    <TableBody>
                        {
                            funcionarios.map((result, index) => (
                                <TableRow key={index}>
                                    <TableCell className="font-medium">{result.name}</TableCell>
                                    <TableCell className={result.salary <= 0 ? "text-red-500 font-medium" : "text-green-500 font-medium"}>R$ {result.salary <= 0 ? `-${result.salary}` : `+${result.salary}`}</TableCell>
                                    <TableCell className={result.approved ? "text-green-500 font-medium" : "text-red-500 font-medium"}>{result.approved ? "Aprovado(a)" : "Reprovado(a)"}</TableCell>
                                    <TableCell className="font-medium">{result.sexy || "Não definido"}</TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
            </Table>
            </div>
        </PageLayout>
    )
}

export default ListarFuncionarios