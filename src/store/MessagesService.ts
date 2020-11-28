import {makeAutoObservable} from "mobx";

class MessagesService {
  messages: Array<any> = [
    {
      "_id": "5fc2a6028746e94e2c0c9a0a",
      "text": "<ReferenceError: units is not defined>",
      "name": "Ward Mclean"
    },
    {
      "_id": "5fc255b36e9cb2239068372b",
      "text": "<ReferenceError: units is not defined>",
      "name": "Patricia Petersen"
    },
    {
      "_id": "5fc2a602573af886ff5df078",
      "text": "<ReferenceError: units is not defined>",
      "name": "Lang Chen"
    },
    {
      "_id": "5fc2a6024ad45988c3ef14a3",
      "text": "<ReferenceError: units is not defined>",
      "name": "Wheeler Bradley"
    },
    {
      "_id": "5fc255b36e9cb2239068372b",
      "text": "<ReferenceError: units is not defined>",
      "name": "Sheila Greene"
    },
    {
      "_id": "5fc255b36e9cb2239068372b",
      "text": "<ReferenceError: units is not defined>",
      "name": "Addie Gonzalez"
    },
    {
      "_id": "5fc2a602cb2b64f504ad3d23",
      "text": "<ReferenceError: units is not defined>",
      "name": "Martin Estrada"
    },
    {
      "_id": "5fc2a602902087bc209076aa",
      "text": "<ReferenceError: units is not defined>",
      "name": "David Wilder"
    },
    {
      "_id": "5fc255b36e9cb2239068372b",
      "text": "<ReferenceError: units is not defined>",
      "name": "Whitehead Tran"
    },
    {
      "_id": "5fc2a602da25ff23d72e93fc",
      "text": "<ReferenceError: units is not defined>",
      "name": "Diane Estes"
    }
  ]

  constructor() {
    makeAutoObservable(this)
  }

}


export default new MessagesService();