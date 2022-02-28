# :metro: Shortest-Subway-Path

Desafío técnico para postular a [Buda.com](https://www.buda.com/) :tada:

## :space_invader: Demo: [https://vadokdev.github.io/Shortest-Subway-Path/](https://vadokdev.github.io/Shortest-Subway-Path/)
![Application demo](https://vadokdev.github.io/Shortest-Subway-Path/demo.png)

## :shipit: Usage 

- Run ```yarn start``` in the repository folder to install the required packages
- Start the application with ```yarn start``` and navigate to [http://localhost:8080](http://localhost:8080)
- Enter the network following the [Network-Description-Structure](##Network-Description-Structure) in the description field
- Set the source and target stations in the start and end fields
- Select the subway color
- Press the blue button

## :memo: Scripts

Start the application on port 8080: 
* ```yarn start```

Build the application (webpack): 
* ```yarn build```

Run unit and integration tests: 
* ```yarn test```

Run coverage collection: 
* ```yarn coverage```

Run mutation tests: 
* ```yarn mutation```

Run linter check: 
* ```yarn link```

Install husky (pre-commits): 
* ```yarn prepare```

## :steam_locomotive: Network Description Structure

A network is described by a string with n lines, where the first line contains an integer ```S``` that defines the number of station in the network. The following ```S``` lines contains the name and color (optional) of the ```n-th``` station, the available colors are ```Verde``` and ```Rojo```. The next line contains an integer ```L``` that defines the number of lines in the network, and the next ```L``` lines contains the details of each network line. A network line is a string composed by a set of lines joined by a ```-```.

### :blue_book: Format
```
S
A
B Rojo
C Verde
...
L
A-B
B-C
C-A
...
```

### :green_book: Example: 
```
9
A
B
C
D
E
F
G Verde
H Rojo
I Verde
3
A-B-C
C-D-E-F
C-G-H-I-F
```