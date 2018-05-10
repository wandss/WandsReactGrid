# WandsReactGrid
Just a (yeat) simple React Grid Component.

*This is a simple ReactJS Grid component that I'm sharing. Despite been so simple (yet), I'm already applying it to my 
personal projects.*

### Functionalities:
1. Auto creating lable for columns based on keys for the provide javascript object.
2. Sorting items.
3. Filter items. *(Possbile to use RegExp)*
4. Get a specific row data.
5. Rename columns lables.
6. Remove columns.
7. Hide Columns.
8. Tries to format values like, datetime and numbers to the browsers locale.
9. Each line (row) of the grid can have a different color.
10. Replaces **boolean** values by glyphicons when required.

### Usage:
1. The **GridComponent** expects a **"gridData"** property, which is an array with objects, like so:
```javascript
const movies = [{id:1, movie:"Monty Python and the Holy Grail", year:1975},
                {id:2, movie:"Pulp Fiction", year:1994},
                {id:3, movie:"The Green Mile", year:1999},
                ]
//Passing as property to the component
<GridComponent gridData={movies} />
```
#### Tthat will render something like:
id | movie | year
-- | ----- | ----
1 | Monty Python and the Holy Grail | 1975
2 | Pulp Fiction | 1994
3 | The Green Mile | 1999

2. Sorting data
*By clickng on each column name, the data will be sorted.*

3. Filtering
*To filter data at the grid, pass the **searchField** as property:

```jsx
<GridComponent gridData={movies} searchField />
```



  
    
