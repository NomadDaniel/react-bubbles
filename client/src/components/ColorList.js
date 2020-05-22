import React, { useState } from "react";
// import axios from "axios";
import api from '../utils/api';

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ( { colors, updateColors } ) => {
  console.log( "colors", colors );
  const [ editing, setEditing ] = useState( false );
  const [ colorToEdit, setColorToEdit ] = useState( initialColor );
  const [ createColor, setCreateColor ] = useState( {
    code: { hex: '' },
    color: '',
    id: Date.now()
  } );

  const editColor = color => {
    setEditing( true );
    setColorToEdit( color );
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    api().put( `/api/colors/${ colorToEdit.id }`, colorToEdit )
      .then( () => {
        alert( 'You updated the color!' );
        api()
          .get( '/api/colors' )
          .then( res => updateColors( res.data ) )
          .catch( err => console.log( "err", err ) );
      } )
      .catch( err => {
        console.log( "err", err );
      } );
    setEditing( false );
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    api().delete( `/api/colors/${ color.id }` )
      .then( () => {
        alert( 'You deleted the color!' );
        api().get( '/api/colors' )
          .then( res => updateColors( res.data ) )
          .catch( err => console.log( "err", err ) );
      } )
      .catch( err => {
        console.log( "err", err );
      } );
    setEditing( false );
  };
  // ______________ Create new color ______________ //
  const createColorSubmit = e => {
    e.preventDefault();
    api().post( '/api/colors', createColor )
      .then( () => {
        alert( 'you created a new color!' );
        api().get( '/api/colors' )
          .then( res => updateColors( res.data ) )
          .catch( err => console.log( err ) );
      } );
  };
  const createOnChange = e => {
    e.preventDefault();
    setCreateColor( {
      ...createColor,
      [ e.target.name ]: e.target.value
    } );
  };

  return (
    <div className="colors-wrap">
      <h4>Colors</h4>
      <ul>
        { colors.map( color => (
          <li key={ color.color } onClick={ () => editColor( color ) }>
            <span>
              <span className="delete" onClick={ e => {
                e.stopPropagation();
                deleteColor( color );
              }
              }>
                X
              </span>{ " " }
              { color.color }
            </span>
            <div
              className="color-box"
              style={ { backgroundColor: color.code.hex } }
            />
          </li>
        ) ) }
      </ul>
      { editing && (
        <form onSubmit={ saveEdit }>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={ e =>
                setColorToEdit( { ...colorToEdit, color: e.target.value } )
              }
              value={ colorToEdit.color }
            />
          </label>
          <label>
            hex code:
            <input
              onChange={ e =>
                setColorToEdit( {
                  ...colorToEdit,
                  code: { hex: e.target.value }
                } )
              }
              value={ colorToEdit.code.hex }
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={ () => setEditing( false ) }>cancel</button>
          </div>
        </form>
      ) }

      {/* Stretch, create new color form */ }
      <div className="spacer">
        <h4>Create a New Color</h4>
        <form className="addColor" onSubmit={ createColorSubmit }>
          <input
            type="text"
            name="color"
            value={ createColor.color }
            onChange={ createOnChange }
            placeholder="color name (i.e, white)"
            style={ { width: '95%', margin: '0 auto' } }
          />
          <br />
          <input
            type="text"
            name="code"
            value={ createColor.code.hex }
            onChange={ e => setCreateColor( { ...colorToEdit, code: { hex: e.target.value } } ) }
            placeholder="hex code (i.e, #ffffff) "
            style={ { width: '95%', margin: '0 auto' } }
          />
          <br />
          <button className="submit-new-color-button" type="submit"  >Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ColorList;
