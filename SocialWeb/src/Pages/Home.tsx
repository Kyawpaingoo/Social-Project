import React, { useState } from 'react'
import Item from '../Components/Item'
import Form from '../Components/Form'
import { useThemeHook } from '../Context/Theme'
import { Box, Container } from '@mui/material'

export type DataTye = {
  id: number,
  content: string,
  name: string
}

const Data: DataTye[] = [
  {id: 1, content: "Hello World", name: "Alice"},
  {id: 2, content: "React is fun.", name: "Bob"},
  {id: 3, content: "Yay, interesting", name: "Chris"},
]


const Home: React.FC = () => {
  const [data, setData] = useState<DataTye[]>(Data);
  const {showForm, setGlobalMsg } = useThemeHook();

  const remove = (id: number): Promise<void> =>{
    return new Promise((resolve)=>{
      setData(data.filter(item => item.id !== id));
      setGlobalMsg("An Item deleted!");
      resolve();
    });
  }

  const add = (content: string, name: string): Promise<void> =>{
    return new Promise((resolve)=>{
      const id: number = data[data.length - 1].id + 1;
      setData([{id, content, name}, ...data]);
      setGlobalMsg("An Item Added!");
      resolve();
    })
  }

  return (
    <Box
      >
      <Container
        maxWidth="sm"
        sx={{mt: 4}}
      >
        {
          showForm && <Form add={add} />
        }
        
        {
          data && data.map(item => (
              <Item key={item.id} item={item} remove={remove} />
          ))
        }
      </Container>
    </Box>
  )
}

export default Home;
