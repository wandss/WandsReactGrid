# WandsReactGrid
Just a (yeat) simple React Grid Component.

*This is a simple ReactJS Grid component that I'm sharing. Despite been so simple (yet), I'm already fully applying it to my
personal projects.*

### Functionalities:
1. Auto creates lable for columns, based on keys for the provided javascript object.
2. Sort items.
3. Filter items. *(Possbile to use RegExp)*
4. Get a specific row data.
5. Rename column's lable.
6. Hide columns.
7. Remove columns.
8. Tries to format values like, datetime and numbers to the browsers locale.
9. Sets a specific color for each line (row), in the grid.
10. Auto format array values as comma separated.
11. Replaces **boolean** values by glyphicons if required.
12. Use css classes.


### Usage:
#### 1. The **GridComponent** expects a **"gridData"** property, which is an array with objects, like so:
```javascript
const movies = [{id:1, movie:"Monty Python and the Holy Grail", year:1975, genre:'Comedy'},
                {id:2, movie:"Pulp Fiction", year:1994, genre:['Drama', 'Crime']},
                {id:3, movie:"The Green Mile", year:1999,genre:['Crime','Drama','Fantasy','Mistery']},
                {id:4, movie:"Requiem For a Dream", year:1999, genre:'Drama'},
]
```
  * Passing the array as property to the component...
```jsx
<GridComponent gridData={movies} />
```
... will render something like:

id | movie | year | genre
-- | ----- | ---- | -----
1 | Monty Python and the Holy Grail | 1975 | Comedy
2 | Pulp Fiction | 1994 | Drama, Crime
3 | The Green Mile | 1999 | Crime, Drama, Fantasy, Mistery
4 | Requiem for a Dream | 1999 | Drama

#### 2. Sorting data
*By clickng on each column name, the data will be sorted.*

#### 3. Filtering

*To filter data in the grid, pass **searchField** as property:*

```jsx
<GridComponent gridData={movies} searchField />
```
An HTML *input* field will be rendered.

*The filtering is case insentive.*

*YAY!!! you can use Regular Expression (RegEXP)*.

#### 4. Get specific data.

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
#### 5. Renaming column lable.
Create an object with the actual name as *key* and the new name as *value*:
```javascript
const newColumNames{movie:"Movie Names", year:"Year"}
```
Now pass this object as the value for the *renameColumns* property.
```jsx
<GridComponent gridData={movies} renameColumns={newColumnNames}/>
```
**Result**

id | Movie Names | Year | genre
-- | ----------- | ---- | -----

#### 6. Hiding Columns:
After the component is rendered, **double click** the column name, or click the icon, to "remove it" from the grid.
A button with the column name will appear, right above the grid. Click on the button to show the column again.

To hide columns before the component is rendered, pass an array with column's names to be hidden as a value for the
property **hiddenColumns**

```javascript
const hidden=['id', 'year']
```
```jsx
<GridComponent gridData={movies} hiddenColumns={hiden}/>
```
***For the above sample, the buttons to show the columns will also be hidden. Hide any column to display all hidden buttons***
***It is still possible to filter data for hidden columns***

#### 7. Removing columns:
By passing an array with "column names" as values for the property **"removeColumns"** will cause these columns to not
be rendered.
```javascript
const wontAppear=['id','year']
```
```jsx
<GridComponent gridData={movies} removeColumns={wontAppear}/>
```
**Result:**

| movie | genre | 
| ----- | ----- |
| Monty Python and the Holy Grail | Comedy|
| Pulp Fiction | Drama, Crime|
| The Green Mile | Crime, Drama, Fantasy, Mistery|
| Requiem for a Dream | Drama |


***If a column has been renamed, the array should contain the new name.***

#### 8. Try to Format values (to fix):

Some values will be formated to the borwser's locale. Like numbers dates and currencies.
If a value has the simbol "$" before a number, this number will be formated to browser's locale.
When values can be converted into a javascript Date object, this date will also be formated according to browser's locale.

*Right now some issues has been dected*

### 9 Defining colors for lines (rows).

Is possible to pass the property **"rowColor"** as a key value pair, within the array with objects.
This key won't be rendered at the grid and will only be used to define the text color for that particular row.

```javascript
const colorfullRows = [{id:1, movie:"Monty Python and the Holy Grail", year:1975, genre:'Comedy', rowColor:'green'},
                {id:2, movie:"Pulp Fiction", year:1994, genre:['Drama', 'Crime']},
                {id:3, movie:"The Green Mile", year:1999,genre:['Crime','Drama','Fantasy','Mistery']},
                {id:4, movie:"Requiem For a Dream", year:1999, genre:'Drama', rowColor:'#AF4539'},
]
```
The above example will render a Grid with the first line text color's set to green, and the last a dark red.
All other lines will keep their original colors.

#### 10 Auto format array as comma separated values.
For the main "movies" array example described here, the values for genre keys are, sometimes represented as an array like:
**['Drama', 'Crime']** and **['Crime','Drama','Fantasy','Mistery']**.

These, as already shown before, will be "joined" and rendered as:
**Drama, Crime** and **Crime, Drama, Fantasy, Mistery**


## Summary:
### Component's Props:
*  gridData: A Required array with objects.
*  searchField: An optional boolean type.
*  getRow: An optional function.
*  renameColumns: An optional object containing "original column name" as *key* and a new name as *value*.
*  hiddenColumns: An optional array with the column's names to be hidden.
*  removeColumns: An optional array with the columns'names that won't be rendered.


