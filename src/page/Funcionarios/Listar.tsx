import { Fragment, useEffect, useState } from "react"
import { IPerson } from "../../model/Persons/person"
import { PersonService } from "../../services/api/persons/PersonServices";
import { PageLayout } from "../../layout/PageLayout";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { useParams } from "react-router";
import NetworkError from "../../components/erros/NetworkError";



function ListarFuncionarios() {
    const [funcionarios, setFuncionarios] = useState<IPerson[]>([]);
    const [getErro, setGetErro] = useState("")

    useEffect(() => {
        PersonService.getAll().then((result) => {
            if(result instanceof Error){
                return setGetErro(result.message)
            }else{
                setFuncionarios(result);
            }
        });
    }, [])

    const {id} = useParams<"id">()

    console.log(id)

    return (
        <PageLayout
            title="Funcionarios"
        >
            <Table>
                {
                    funcionarios.length <= 0 ? <NetworkError message={getErro} name="Comunicação com o banco de dados" /> : (
                    <Fragment>
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
                    </Fragment>
                    )
                }
            </Table>
        </PageLayout>
    )
}

export default ListarFuncionarios