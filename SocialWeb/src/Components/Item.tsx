import React from 'react'
import { DataTye } from '../Pages/Home'

import {Box, Card, CardContent, Typography, IconButton} from '@mui/material'
import { Alarm as TimeIcon, AccountCircle as UserIcon, Delete as DeleteIcon } from '@mui/icons-material'
import {green} from '@mui/material/colors'
import { useNavigate } from 'react-router-dom'

type ItemProps = {
    item: DataTye
    remove:(id: number)=> Promise<void>,
    primary?: boolean
}

const Item: React.FC<ItemProps> = (props: ItemProps) => {
  const navigate = useNavigate();

  return (
   <Card sx={{ mb: 2}}>
    {
      props.primary && <Box sx={{ height: 50, bgcolor: green[500]}} />
    }
    <CardContent
      onClick={()=>navigate('/comments/1')}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 1
          }}
        >
          <TimeIcon fontSize="small" color='success' />
          <Typography
            variant='caption'
            sx={{
              color: green[500]
            }}
          >
            A few second ago
          </Typography>
        </Box>
        <IconButton
          size='small'
          onClick={(e)=>{
            props.remove(props.item.id);
            e.stopPropagation();
          }}
        >
          <DeleteIcon fontSize='inherit' />
        </IconButton>
      </Box>

      <Typography sx={{ my: 3}}>{props.item.content}</Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 1
        }}
      >
        <UserIcon 
          fontSize='medium'
          color='info'
        />
        <Typography variant='caption'>{props.item.name}</Typography>
      </Box>
    </CardContent>
   </Card>
  )
}

export default Item