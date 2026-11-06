import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  computed,
  inject,
  input,
  model,
  signal,
} from '@angular/core';
import { ChordImageDraft } from '../../models/song-form.model';

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

@Component({
  selector: 'app-chord-images-uploader',
  imports: [],
  templateUrl: './chord-images-uploader.html',
  styleUrl: './chord-images-uploader.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class ChordImagesUploader {
  readonly images = model<ChordImageDraft[]>([]);
  readonly maxFiles = input(5);
  readonly maxSizeBytes = input(10 * 1024 * 1024);

  protected readonly errors = signal<string[]>([]);
  protected readonly dragging = signal(false);
  protected readonly accept = ALLOWED_TYPES.join(',');
  protected readonly canAdd = computed(() => this.images().length < this.maxFiles());
  protected readonly maxSizeLabel = computed(
    () => `${Math.round(this.maxSizeBytes() / (1024 * 1024))} MB`,
  );

  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    this.destroyRef.onDestroy(() => {
      this.images().forEach((image) => URL.revokeObjectURL(image.previewUrl));
    });
  }

  protected onFileInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.addFiles(input.files);
    }

    input.value = '';
  }

  protected onDrop(event: DragEvent): void {
    event.preventDefault();
    this.dragging.set(false);

    if (event.dataTransfer?.files.length) {
      this.addFiles(event.dataTransfer.files);
    }
  }

  protected onDragOver(event: DragEvent): void {
    event.preventDefault();
    if (this.canAdd()) {
      this.dragging.set(true);
    }
  }

  protected onDragLeave(): void {
    this.dragging.set(false);
  }

  protected remove(imageId: string): void {
    const image = this.images().find((item) => item.id === imageId);
    if (image) {
      URL.revokeObjectURL(image.previewUrl);
    }

    this.images.set(this.images().filter((item) => item.id !== imageId));
    this.errors.set([]);
  }

  protected move(index: number, delta: number): void {
    const images = [...this.images()];
    const target = index + delta;

    if (target < 0 || target >= images.length) {
      return;
    }

    const [moved] = images.splice(index, 1);
    images.splice(target, 0, moved);
    this.images.set(images);
  }

  protected updateCaption(imageId: string, event: Event): void {
    const caption = (event.target as HTMLInputElement).value;

    this.images.set(
      this.images().map((image) => (image.id === imageId ? { ...image, caption } : image)),
    );
  }

  private addFiles(files: FileList | File[]): void {
    const current = this.images();
    const accepted: ChordImageDraft[] = [];
    const errors: string[] = [];
    const maxFiles = this.maxFiles();
    const maxSize = this.maxSizeBytes();

    for (const file of Array.from(files)) {
      if (current.length + accepted.length >= maxFiles) {
        errors.push(`Solo puedes agregar hasta ${maxFiles} imágenes.`);
        break;
      }

      if (!ALLOWED_TYPES.includes(file.type)) {
        errors.push(`«${file.name}» no es JPEG, PNG ni WebP.`);
        continue;
      }

      if (file.size > maxSize) {
        errors.push(`«${file.name}» supera los ${this.maxSizeLabel()}.`);
        continue;
      }

      const isDuplicate = [...current, ...accepted].some(
        (image) =>
          image.file.name === file.name &&
          image.file.size === file.size &&
          image.file.lastModified === file.lastModified,
      );

      if (isDuplicate) {
        errors.push(`«${file.name}» ya está agregada.`);
        continue;
      }

      accepted.push({
        id: this.createId(),
        file,
        previewUrl: URL.createObjectURL(file),
        caption: '',
      });
    }

    if (accepted.length > 0) {
      this.images.set([...current, ...accepted]);
    }

    this.errors.set(errors);
  }

  private createId(): string {
    return (
      globalThis.crypto?.randomUUID?.() ??
      `img-${Date.now()}-${Math.random().toString(36).slice(2)}`
    );
  }
}
