-- Create storage bucket for pin images (public access)
INSERT INTO storage.buckets (id, name, public)
VALUES ('pin-images', 'pin-images', true);

-- Allow anyone to read pin images (public bucket)
CREATE POLICY "Public can view pin images"
ON storage.objects
FOR SELECT
USING (bucket_id = 'pin-images');

-- Allow authenticated users to upload pin images
CREATE POLICY "Authenticated users can upload pin images"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'pin-images');

-- Allow users to delete their own pin images (optional cleanup)
CREATE POLICY "Users can delete own pin images"
ON storage.objects
FOR DELETE
USING (bucket_id = 'pin-images');