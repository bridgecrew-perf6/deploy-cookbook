import React from 'react';
import {Link} from 'react-router-dom';
import authService from '../../services/auth.service';
import ingredientService from '../../services/ingredients.service';
import {BACKEND_URL} from '../../utils/constants';
import styles from './Ingredient.module.css';
import {user_id} from '../../utils/constants';
import {isAdmin} from '../../utils/constants';
import Modal from 'react-modal';
import App from '../../App';
import classNames from 'classnames';

const modalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    background: '#F5A400',
    maxHeight: '310px',
    maxWidth: '438px',
    borderRadius: '15px',
    padding: '20px 20px 15px',
  },
};

if (process.env.NODE_ENV !== 'test') {
  Modal.setAppElement ('#root');
}

class Ingredients extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      ingredients: [],
      modalIsOpen: false,
      deleteModal: false,
      editIngredient: null,
      deleteIngredient: null,
    };
  }
  openModal = ingredient => {
    console.log ('open Modal');
    this.setState ({
      modalIsOpen: true,
      editIngredient: ingredient,
      showModalErrorMsg: false,
    });
  };

  deleteModal = ingredient => {
    console.log ('open Modal');
    this.setState ({
      deleteModal: true,
      deleteIngredient: ingredient,
    });
  };

  closeDeleteModal = () => {
    this.setState ({
      deleteModal: false,
      deleteIngredient: null,
    });
  };
  closeModal = () => {
    this.setState ({
      modalIsOpen: false,
      editIngredient: null,
    });
  };
  updateIngredient = () => {
    const newName = document.getElementById ("ingredient_newName").value;
    if (newName === '') {
      this.setState ({showModalErrorMsg: true});
      return;
    }
    this.setState ({showModalErrorMsg: false});
    const ingredient = this.state.editIngredient;
    ingredientService
      .updateIngredient (ingredient.id, newName)
      .then (result => {
        const response = result.data;
        this.setState ({
          modalIsOpen: false,
        });
        if (response.status === "Success") {
          const ingredients = this.state.ingredients;
          const index = ingredients.findIndex (
            currentIngredient => currentIngredient.id === ingredient.id
          );
          ingredients[index]["name"] = newName;
          this.setState ({
            ingredients,
          });
          setTimeout (() => alert ("Ingredient Updated"), 250);
        } else {
          setTimeout (() => alert (`Error: ${response.message}`), 250);
        }
      });
  };

  deleteIngredient = () => {
    console.log ('ip delete');
    const ingredient = this.state.deleteIngredient;
    ingredientService.deleteIngredients (ingredient.id).then (result => {
      const response = result.data;
      this.setState ({
        deleteModal: false,
      });
      if (response.status === 'success') {
        this.componentDidMount ();
        setTimeout (() => alert ('Ingredient Deleted'), 250);
      } else {
        setTimeout (() => alert (`Error: ${response.message}`), 250);
      }
    });
  };

  componentDidMount () {
    this.fetchData ();
  }

  render () {
    return (
      <div className="IngredientsList mt-20 p-12">
        {this.props.success === "true" ?
        <div className="text-green-700" role="alert">
        Ingredient added Successfully
      </div>
      : "" }
        <div class="flex flex-col text-center">
          <div class="overflow-x-auto sm:-mx-6">
            <div class="inline-block py-2 max-w-max sm:px-6">
              <div class="overflow-hidden shadow-md sm:rounded-lg">
                <table class="max-w-max">
                  <thead
                    class={classNames (
                      `bg-gradient-to-r from-${this.props.bgcolor}-100 via-${this.props.bgcolor}-100 to-${this.props.bgcolor}-100`
                    )}
                  >
                    <tr>
                      <th
                        scope="col"
                        class="py-3 px-6 text-lg font-medium tracking-wider capitalize text-left text-gray-800 dark:text-gray-400"
                      >
                        Ingredient
                      </th>

                      <th scope="col" class="relative py-3 px-6">
                        <span class="sr-only">Edit</span>
                      </th>

                      {user_id != ''
                        ? <th scope="col" class="relative text-right py-3 px-6">
                            <Link to="/createIngrdient">
                              <button className={styles.btnEdit}>
                                + ADD
                              </button>
                            </Link>
                          </th>
                        : <th scope="col" class="relative py-3 px-6">
                            <span class="sr-only">Edit</span>
                          </th>}

                    </tr>
                  </thead>
                  <tbody>
                    {this.state.ingredients.map (ingredient => (
                      <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <Link to={`/ingredients/${ingredient.id}`}>
                          <td class="py-4 px-6 text-lg text-gray-600 whitespace-nowrap capitalize dark:text-gray-400">
                            {ingredient.name}
                          </td>
                        </Link>

                        {isAdmin == 'true'
                          ? <td class="py-4 px-6 text-lg font-medium text-right whitespace-nowrap">
                              <button
                                type="button"
                                onClick={() => this.deleteModal (ingredient)}
                                className={styles.btnEdit}
                              >
                                Delete
                              </button>
                            </td>
                          : <td class="py-4 px-6 text-lg font-medium text-right whitespace-nowrap" />}

                        {user_id != ''
                          ? <td class="py-4 px-6 text-lg font-medium text-right whitespace-nowrap">
                              <button
                                type="button"
                                onClick={() => this.openModal (ingredient)}
                                className={styles.btnEdit}
                              >
                                Edit
                              </button>
                            </td>
                          : <td class="py-4 px-6 text-lg font-medium text-center whitespace-nowrap" />}

                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={modalStyles}
          contentLabel="Edit Ingredient"
        >
          <h3 className={styles.modalHeading}>Update Ingredient</h3>
          <div className={styles.modalForm}>
            <div>
              <input
                className={styles.modalTextInput}
                defaultValue={
                  this.state.editIngredient
                    ? this.state.editIngredient.name
                    : ''
                }
                type="text"
                id="ingredient_newName"
                required
              />
              {this.state.showModalErrorMsg
                ? <p className={styles.modalErrorMsg}>Name can't be empty</p>
                : ''}
            </div>

          </div>
          <div className={styles.modalButtonGroup}>
            <button
              className={styles.modalButton}
              onClick={() => this.closeModal ()}
              type="button"
            >
              Cancel
            </button>
            <button
              className={styles.modalButton}
              onClick={() => this.updateIngredient ()}
              type="button"
            >
              Update
            </button>
          </div>
        </Modal>
        <Modal
          isOpen={this.state.deleteModal}
          onRequestClose={this.closeDeleteModal}
          style={modalStyles}
          contentLabel="Delete Ingredient"
        >
          <h3 className={styles.modalHeading}>Delete Ingredient</h3>
          <div className={styles.modalTextInput}>
            Deleting this ingredient will remove it from recipes. Do you want to proceed?
          </div>
          <div className={styles.modalButtonGroup}>
            <button
              className={styles.modalButton}
              onClick={() => this.closeDeleteModal ()}
              type="button"
            >
              Cancel
            </button>
            <button
              className={styles.modalButton}
              onClick={() => this.deleteIngredient ()}
              type="button"
            >
              Delete
            </button>
          </div>
        </Modal>

      </div>
    );
  }

  fetchData () {
    authService
      .allingredients ()
      .then (response => response.json ())
      .then (response => {
        this.setState ({ingredients: response});
      });
  }
}

export default Ingredients;
