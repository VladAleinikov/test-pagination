import Head from "next/head";
import { Inter } from "next/font/google";
import Table from "react-bootstrap/Table";
import { Alert, Container } from "react-bootstrap";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { Pagination } from "@/components/Pagination";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

type TUserItem = {
  id: number
  firstname: string
  lastname: string
  email: string
  phone: string
  updatedAt: string
}

type TGetServerSideProps = {
  statusCode: number
  users: TUserItem[],
  page: number,
  lastPage: number
}


export const getServerSideProps = (async (ctx: GetServerSidePropsContext): Promise<{ props: TGetServerSideProps }> => {
  try {
    const  page  = ctx.query.page || 0;
    const res = await fetch("http://localhost:3000/users/?page=" + page, { method: 'GET' })
    if (!res.ok) {
      return { props: { statusCode: res.status, users: [], page: 0, lastPage: 0 } }
    }
    const { users, lastPage } = await res.json();

    return {
      props: { statusCode: 200, users, page: parseInt(page as string), lastPage }
    }
  } catch (e) {
    return { props: { statusCode: 500, users: [], page: 0, lastPage: 0 } }
  }
}) satisfies GetServerSideProps<TGetServerSideProps>


export default function Home({ statusCode, users, page, lastPage }: TGetServerSideProps) {
  if (statusCode !== 200) {
    return <Alert variant={'danger'}>Ошибка {statusCode} при загрузке данных</Alert>
  }


  return (
    <>
      <Head>
        <title>Тестовое задание</title>
        <meta name="description" content="Тестовое задание" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={inter.className}>
        <Container>
          <h1 className={'mb-5'}>Пользователи</h1>

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Имя</th>
                <th>Фамилия</th>
                <th>Телефон</th>
                <th>Email</th>
                <th>Дата обновления</th>
              </tr>
            </thead>
            <tbody>
              {
                users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.firstname}</td>
                    <td>{user.lastname}</td>
                    <td>{user.phone}</td>
                    <td>{user.email}</td>
                    <td>{user.updatedAt}</td>
                  </tr>
                ))
              }
            </tbody>
          </Table>
          {/*TODO add pagination*/}
          <Pagination currentPage={page} lastPage={lastPage} />

        </Container>
      </main>
    </>
  );
}
