-- Permite que coordenadores atualizem perfis dos alunos vinculados a eles

create policy "profiles_update_coordenador"
  on public.profiles for update
  to authenticated
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid()
      and p.cargo = 'coordenador'
      and profiles.coordenador_id = auth.uid()
    )
  );
