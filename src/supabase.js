
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://mpynujgocmdacepxlgrv.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1weW51amdvY21kYWNlcHhsZ3J2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTMwNzM5NjksImV4cCI6MjAwODY0OTk2OX0.5M6_3IpjRjLUWT8YrdKnGQHOW8GwJoSYvIelOrfQdUg";
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;