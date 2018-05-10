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
9. Sets a specific color for each line (row), in the grid.
10. Replaces **boolean** values by glyphicons when required.

### Usage:
1. The **GridComponent** expects a **"gridData"** property, which is an array with objects, like so:
```javascript
const movies = [{id:1, movie:"Monty Python and the Holy Grail", year:1975},
                {id:2, movie:"Pulp Fiction", year:1994},
                {id:3, movie:"The Green Mile", year:1999},
                ];
```
  * Passing the array as property to the component.
```jsx
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

*To filter data in the grid, pass the **searchField** as property:*

```jsx
<GridComponent gridData={movies} searchField />
```
An Html input field will be rendered.
*The filtering is case insentive.*
*Yep you can use Regular Expression *(RegEXP)*.

4. Get specific data
*Pass the **getRow** property as a function callback to retrive an object with the data for the clicked row*
First: Create the function.
```javascript
const getItem = function(row){console.log(row)};
```
Second: Pass the created function as a property:
```jsx
<GridComponent gridData={movies} getRow={getItem}/>
```
*Now when clicking over any row, that specific row data will be "retrived":*
**Result**
```javascript
{id:2, movie:"Pulp Fiction", year:1994}
```
5. Renaming column lable.
Create an object with the actual name as *key* and the new name as *value*:
```javascript
const newColumNames{movie:"Movie Names", year:"Year"}
```
Now pass this object as the value for the *renameColumns* property.
```jsx
<GridComponent gridData={movies} renameColumns={newColumnNames}/>
```


    
