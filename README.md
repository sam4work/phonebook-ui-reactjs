
# Phonebook Manager

A simple frontend contact manager built with react js.


## Related

This project requires a API to function properly. The laravel API has authentication and all API endpoints. 
Set the backend first in order to use this project. Here is a link to the api repo [phonebook-api-laravel](https://github.com/sam4work/phonebook-api-laravel.git)


## Features

- Create Contact
- Update Contact
- View/List Contact(s)
- Delete Contact
- Authentication


## Run Locally

Clone the project

```bash
  git clone https://github.com/sam4work/phonebook-ui-reactjs.git
```

Go to the project directory

```bash
  cd phonebook-ui-reactjs
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```


## Tech Stack

**Client:** React (Typescript), Zustand, TailwindCSS



## Documentation

- [React JS](https://react.dev/) 
- [React Router v6](https://reactrouter.com)
- [Tailwind css ](https://tailwindcss.com/)
- [React-Toastify ](https://fkhadra.github.io/react-toastify/introduction)
- [Zustand](https://docs.pmnd.rs/zustand)
- [SWR](https://swr.vercel.app/)




## API Reference


#### Create Contact

```http
  POST /api/contacts
```
Request Body
{
    first_name : string,
    last_name : string,
    type: string,
    sim_number: string
}

| Parameter | Type     | Description                       | 
| :-------- | :------- | :-------------------------------- |
| -         | -        | **Required**. Create new contact | 



#### Get all Contacts

```http
  GET /api/contacts
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `search` | `string` | **Optional**. search string |
| `page` | `string` | **Optional**. use with pagination |

#### Get a specific Contact

```http
  GET /api/contacts/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of contact to fetch |


#### Update Contact

```http
  PATCH /api/contacts/${id}/
```
Request Body
{
    first_name : string,
    last_name : string,
}
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of contact to update |


#### Delete Contact

```http
  DELETE /api/contacts/${id}/
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of contact to delete |


--------------


#### Update Phone NUmber

```http
  PATCH /api/phone-numbers/${id}
```
Request Body
{
    type : string,
    sim_number : string,
}
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of phone number  |

## Roadmap

- Edit user profile
- Allow contacts to have multiple phone numbers
- Select favourite contacts
- Add image, email, address to contact details
- Add service provider and country code to phone number details

## Authors

- [@sam4work](https://github.com/sam4work)

