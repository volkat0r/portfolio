import { Component, inject } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { ScrollService } from '../../shared/services/scroll.service';
import { HttpClient } from '@angular/common/http';

/**
 * Contact section component.
 *
 * Renders the contact form and handles validation, submission,
 * and user feedback. Form data is sent via HTTP POST to the
 * backend mail endpoint. Validation is surfaced only after the
 * user has touched (blurred) each field. The submit button is
 * disabled until all required fields are valid.
 */
@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [TranslatePipe, ReactiveFormsModule, FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  constructor(private scrollService: ScrollService) {}

  /** Injects the Angular HttpClient for the mail POST request. */
  http = inject(HttpClient);

  /** Bound model for all contact form fields. */
  contactData = {
    name: '',
    email: '',
    message: '',
    privacypolicy: false,
  };

  /**
   * Controls whether the mail is actually sent.
   * Set to `false` in production to enable the HTTP request.
   */
  mailTest = false;

  /**
   * Reflects the current submission state.
   * - `'idle'`    – no submission attempted yet
   * - `'success'` – mail was sent (or test-submitted) successfully
   * - `'error'`   – HTTP request failed
   */
  submitStatus: 'idle' | 'success' | 'error' = 'idle';

  /** HTTP POST configuration for the mail endpoint. */
  post = {
    endPoint: 'https://umgestalt.de/sendMail.php',
    body: (payload: any) => JSON.stringify(payload),
    options: {
      headers: {
        'Content-Type': 'text/plain',
        responseType: 'text',
      },
    },
  };

  /**
   * Scrolls the page to the section with the given element id.
   * @param id - The id attribute of the target section element.
   */
  scrollToSection(id: string) {
    this.scrollService.scrollToElementById(id);
  }

  /**
   * Handles the form submission.
   *
   * If the form is invalid all controls are marked as touched so
   * that validation errors become visible, and submission is
   * aborted. Otherwise the payload is sent (or, during testing,
   * the form is reset immediately). `submitStatus` is updated to
   * reflect the outcome so the template can display feedback.
   *
   * @param ngForm - The Angular template-driven form reference.
   */
  onSubmit(ngForm: NgForm) {
    if (ngForm.invalid) {
      Object.values(ngForm.controls).forEach((control) => {
        control.markAsTouched();
      });
      return;
    }

    if (!this.mailTest) {
      this.http.post(this.post.endPoint, this.post.body(this.contactData)).subscribe({
        next: () => {
          this.submitStatus = 'success';
          ngForm.resetForm();
        },
        error: (error) => {
          this.submitStatus = 'error';
          console.error(error);
        },
        complete: () => console.info('send post complete'),
      });
    } else {
      this.submitStatus = 'success';
      ngForm.resetForm();
    }
  }
}
