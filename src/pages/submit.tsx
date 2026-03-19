import type { FC } from 'hono/jsx';
import { Layout } from '../components/Layout';
import { serializeForScript, type Locale, type Messages } from '../i18n';

export const SubmitPage: FC<{
  moderationEnabled: boolean;
  locale: Locale;
  messages: Messages;
}> = ({ moderationEnabled, locale, messages }) => {
  const runtimeData = serializeForScript({
    linkLabels: {
      app: messages.submit.labels.linkApp,
      system: messages.submit.labels.linkSystem,
    },
    file: messages.submit.file,
    actions: messages.submit.actions,
    success: messages.submit.success,
    errors: messages.submit.errors,
  });

  return (
    <Layout title={messages.submit.title} activePath="/submit" locale={locale} messages={messages}>
      <section class="section">
        <div class="form-card animate-in">
          <h2>{messages.submit.heading}</h2>
          <p class="subtitle">
            {messages.submit.subtitle}
            {moderationEnabled
              ? ` ${messages.submit.moderationEnabled}`
              : ` ${messages.submit.moderationDisabled}`}
          </p>

          <div class="form-type-tabs" id="typeTabs">
            <button class="form-type-tab active" data-type="app">{messages.submit.tabs.app}</button>
            <button class="form-type-tab" data-type="system">{messages.submit.tabs.system}</button>
          </div>

          <form id="submitForm">
            <input type="hidden" name="type" id="typeInput" value="app" />

            <div class="form-group">
              <label class="form-label">{messages.submit.labels.name}</label>
              <input class="form-input" type="text" name="name" required placeholder={messages.submit.placeholders.name} />
            </div>

            <div class="form-group">
              <label class="form-label">{messages.submit.labels.description}</label>
              <textarea class="form-textarea" name="description" required placeholder={messages.submit.placeholders.description}></textarea>
            </div>

            <div class="form-group">
              <label class="form-label" id="linkLabel">{messages.submit.labels.linkApp}</label>
              <input class="form-input" type="url" name="link" required placeholder={messages.submit.placeholders.link} />
            </div>

            <div class="form-group">
              <label class="form-label">{messages.submit.labels.image} <span style="font-weight:400;text-transform:none;letter-spacing:0">({messages.submit.labels.optional})</span></label>
              <label class="form-file-label" id="fileLabel">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>
                <span id="fileLabelText">{messages.submit.file.upload}</span>
                <input type="file" name="image" accept="image/*" id="fileInput" />
              </label>
              <div class="form-file-preview" id="filePreview" style="display:none">
                <img id="previewImg" src="" alt="" />
                <span class="file-name" id="fileName"></span>
              </div>
              <div class="form-hint">{messages.submit.file.hint}</div>
            </div>

            <button type="submit" class="btn-primary" id="submitBtn">{messages.submit.actions.submit}</button>
          </form>
        </div>
      </section>

      <script dangerouslySetInnerHTML={{ __html: `
        (function(){
          const runtime = ${runtimeData};
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
            linkLabel.textContent = e.target.dataset.type === 'app' ? runtime.linkLabels.app : runtime.linkLabels.system;
          });

          fileInput.addEventListener('change', function() {
            const file = fileInput.files[0];
            if (!file) return;
            fileName.textContent = file.name;
            previewImg.src = URL.createObjectURL(file);
            filePreview.style.display = 'flex';
            fileLabelText.textContent = runtime.file.change;
          });

          form.addEventListener('submit', async function(e) {
            e.preventDefault();
            submitBtn.disabled = true;
            submitBtn.textContent = runtime.actions.submitting;

            try {
              let imageKey = null;
              const file = fileInput.files[0];
              if (file) {
                const fd = new FormData();
                fd.append('file', file);
                const upRes = await fetch('/api/upload', { method: 'POST', body: fd });
                if (!upRes.ok) {
                  const upData = await upRes.json().catch(function(){ return {}; });
                  throw new Error(upData.error || runtime.errors.imageUploadFailed);
                }
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
                const err = await res.json().catch(function(){ return {}; });
                throw new Error(err.error || runtime.errors.submissionFailed);
              }

              const data = await res.json();
              const msg = data.status === 'approved'
                ? runtime.success.approved
                : runtime.success.pending;
              showToast(msg);
              form.reset();
              filePreview.style.display = 'none';
              fileLabelText.textContent = runtime.file.upload;
              typeTabs.querySelectorAll('.form-type-tab').forEach(function(t){ t.classList.remove('active'); });
              typeTabs.querySelector('[data-type="app"]').classList.add('active');
              typeInput.value = 'app';
              linkLabel.textContent = runtime.linkLabels.app;
            } catch (err) {
              showToast(err.message, true);
            } finally {
              submitBtn.disabled = false;
              submitBtn.textContent = runtime.actions.submit;
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
