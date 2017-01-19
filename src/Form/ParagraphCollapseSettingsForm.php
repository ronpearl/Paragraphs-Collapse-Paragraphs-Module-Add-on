<?php
/**
 * @file
 * Contains \Drupal\paragraphcollapse\Form\ParagraphCollapseSettingsForm
 */

namespace Drupal\paragraphcollapse\Form;

use Drupal\Core\Form\ConfigFormBase;
use Symfony\Component\HttpFoundation\Request;
use Drupal\Core\Form\FormStateInterface;

/**
 * Define a form to configure paragraphcollapse module settings
 */

class ParagraphCollapseSettingsForm extends ConfigFormBase {

  /**
   * (@inheritdoc)
   */
  public function getFormID() {
    return 'paragraphcollapse_admin_settings';
  }

  /**
   * (@inheritdoc)
   */
  public function getEditableConfigNames() {
    return [
      'paragraphcollapse.settings'
    ];
  }

  /**
   * (@inheritdoc)
   */
  public function buildForm(array $form, FormStateInterface $form_state, Request $request = NULL) {
    $config = $this->config('paragraphcollapse.settings');

    $form['cleanup'] = array(
      '#type' => 'fieldset',
      '#title' => t('Clean Up Paragraphs Module')
    );

    $form['cleanup']['paragraphcollapse_clean_type'] = array(
      '#type' => 'checkboxes',
      '#default_value' => $config->get('clean_type'),
      '#options' => array('yes' => t('Remove the word "Type: " from each paragraph listing'))
    );

    $form['array_filter'] = array('#type' => 'value', '#value' => TRUE);

    return parent::buildForm($form, $form_state);
  }

  /**
   * (@inheritdoc)
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    $clean_type = array_filter($form_state->getValue('paragraphcollapse_clean_type'));

    $this->config('paragraphcollapse.settings')
         ->set('clean_type', $clean_type)
         ->save();

    parent::submitForm($form, $form_state);
  }

}