import type { FC } from 'hono/jsx';
import { Layout } from '../components/Layout';

export const SubmitPage: FC<{ moderationEnabled: boolean }> = ({ moderationEnabled }) => {
  return (
    <Layout title="Submit" activePath="/submit">
      <section class="section">
        <div class="form-card animate-in">
          <h2>Submit a Product</h2>
          <p class="subtitle">
            Share your app or system tool with the community.
            {moderationEnabled
              ? ' Submissions will be reviewed before going live.'
              : ' Submissions go live instantly.'}
          </p>

          <div class="form-type-tabs" id="typeTabs">
            <button class="form-type-tab active" data-type="app">App</button>
            <button class="form-type-tab" data-type="system">System Tool</button>
          </div>

          <form id="submitForm">
            <input type="hidden" name="type" id="typeInput" value="app" />

            <div class="form-group">
              <label class="form-label">Name</label>
              <input class="form-input" type="text" name="name" required placeholder="Your product name" />
            </div>

            <div class="form-group">
              <label class="form-label">Description</label>
              <textarea class="form-textarea" name="description" required placeholder="Brief description of what it does…"></textarea>
            </div>

            <div class="form-group">
              <label class="form-label" id="linkLabel">App Store Link</label>
              <input class="form-input" type="url" name="link" required placeholder="https://" />
            </div>

            <div class="form-group">
              <label class="form-label">Icon / Screenshot <span style="font-weight:400;text-transform:none;letter-spacing:0">(optional)</span></label>
              <label class="form-file-label" id="fileLabel">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>
                <span id="fileLabelText">Click to upload image</span>
                <input type="file" name="image" accept="image/*" id="fileInput" />
              </label>
              <div class="form-file-preview" id="filePreview" style="display:none">
                <img id="previewImg" src="" alt="" />
                <span class="file-name" id="fileName"></span>
              </div>
              <div class="form-hint">Max 5 MB. PNG, JPG, WebP, SVG.</div>
            </div>

            <button type="submit" class="btn-primary" id="submitBtn">Submit Product</button>
          </form>
        </div>
      </section>

      <script dangerouslySetInnerHTML={{ __html: `
        (function(){
          const form = document.getElementById('submitForm');
          const typeTabs = document.getElementById('typeTabs');
          const typeInput = document.getElementById('typeInput');
          const linkLabel = document.getElementById('linkLabel');
          const fileInput = document.getElementById('fileInput');
          const filePreview = document.getElementById('filePreview');
          const previewImg = document.getElementById('previewImg');
          const fileName = document.getElementById('fileName');
          const fileLabelText = document.getElementById('fileLabelText');
          const submitBtn = document.getElementById('submitBtn');

          typeTabs.addEventListener('click', function(e) {
            if (!e.target.classList.contains('form-type-tab')) return;
            typeTabs.querySelectorAll('.form-type-tab').forEach(function(t){ t.classList.remove('active'); });
            e.target.classList.add('active');
            typeInput.value = e.target.dataset.type;
            linkLabel.textContent = e.target.dataset.type === 'app' ? 'App Store Link' : 'GitHub Link';
          });

          fileInput.addEventListener('change', function() {
            const file = fileInput.files[0];
            if (!file) return;
            fileName.textContent = file.name;
            previewImg.src = URL.createObjectURL(file);
            filePreview.style.display = 'flex';
            fileLabelText.textContent = 'Change image';
          });

          form.addEventListener('submit', async function(e) {
            e.preventDefault();
            submitBtn.disabled = true;
            submitBtn.textContent = 'Submitting…';

            try {
              let imageKey = null;
              const file = fileInput.files[0];
              if (file) {
                const fd = new FormData();
                fd.append('file', file);
                const upRes = await fetch('/api/upload', { method: 'POST', body: fd });
                if (!upRes.ok) throw new Error('Image upload failed');
                const upData = await upRes.json();
                imageKey = upData.key;
              }

              const payload = {
                type: typeInput.value,
                name: form.name.value,
                description: form.description.value,
                link: form.link.value,
                image_key: imageKey,
              };

              const res = await fetch('/api/apps', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
              });

              if (!res.ok) {
                const err = await res.json();
                throw new Error(err.error || 'Submission failed');
              }

              const data = await res.json();
              const msg = data.status === 'approved'
                ? 'Submitted successfully! Your product is now live.'
                : 'Submitted successfully! Awaiting review.';
              showToast(msg);
              form.reset();
              filePreview.style.display = 'none';
              fileLabelText.textContent = 'Click to upload image';
              typeTabs.querySelectorAll('.form-type-tab').forEach(function(t){ t.classList.remove('active'); });
              typeTabs.querySelector('[data-type="app"]').classList.add('active');
              typeInput.value = 'app';
              linkLabel.textContent = 'App Store Link';
            } catch (err) {
              showToast(err.message, true);
            } finally {
              submitBtn.disabled = false;
              submitBtn.textContent = 'Submit Product';
            }
          });

          function showToast(msg, isError) {
            const el = document.createElement('div');
            el.className = 'toast' + (isError ? ' error' : '');
            el.textContent = msg;
            document.body.appendChild(el);
            setTimeout(function(){ el.remove(); }, 3200);
          }
        })();
      `}} />
    </Layout>
  );
};
